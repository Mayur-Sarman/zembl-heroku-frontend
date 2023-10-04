import { Dispatch, PropsWithChildren, SetStateAction, createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  ABN_ACTIVE,
  CAndI_VALUE,
  LEAD_STATUS_CONVERTED_WON,
  RESIDENTIAL_VALUE,
  RegistrationData,
  SME_VALUE,
} from '../constants'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query'
import { Lead, LeadResponse, patchUpdateLead, postCreateLead } from '../api/lead'
import { SFFile, postUploadAttachment } from '../api/file'
import { CommonResponse, SimpleResponse } from '../api/common'
import { useLocation, useNavigate } from 'react-router-dom'
import { ABNResponse, getSearchABN } from '../api/abn'
import { Site, SiteResponse, postCreateSite } from '../api/site'
import { OCRFileResult, postUploadOCR } from '../api/ocr'
import { OCRMutationPayload } from '../helpers/ocr'
import { Account, postCreateAccount } from '../api/account'
import {
  CreateQuoteLinePayload,
  CreateQuoteLineResponse,
  PostCreateQuotePayload,
  Quote,
  QuoteResponse,
  buildConfirmQuotePayload,
  patchUpdateQuote,
  postConfirmQuote,
  postCreateQuote,
  postCreateQuoteLine,
} from '../api/quote'
import { isArray } from 'lodash'
import { MainProfile, UpdateProfileResponse, patchUpdateProfile } from '../api/profile'
import { GoogleMapExtractedComponents } from '../helpers/googleMap'
import { ReCaptchaValidateResponse, postValidateReCaptcha } from '../api/reCapcha'
import { AxiosError } from 'axios'
import { useToast } from '../hooks'
import { ZEMBL_DEBUG_MODE } from '../constants/misc'

export const RegistrationContext = createContext({} as RegistrationActions)
export const RegistrationContextProvider = ({ children }: PropsWithChildren) => {
  const { fireAlert } = useToast()
  const location = useLocation()
  const navigate = useNavigate()
  const [registrationData, setRegistrationData] = useState<RegistrationData>({} as RegistrationData)
  const [registrationToken, setRegistrationToken] = useState<string | null | undefined>(null)
  const [enableABNFetching, setEnableABNFetching] = useState<boolean>(false)

  const handleErrorResponse = (
    error: AxiosError,
    message = `Unfortunately, we couldn't process your request at this time. Please try again later.`,
  ) => {
    let errorMessage = message
    switch (error.status) {
      case 401:
        errorMessage = 'Your session has expired. Please submit a new registration.'
        setRegistrationToken(null)
        setRegistrationData({})
        setEnableABNFetching(false)
        navigate('/')
        return
    }
    fireAlert({ children: errorMessage, type: 'error', duration: 5 })
  }

  const searchABNQuery = useQuery({
    queryKey: ['searchABN', { abn: registrationData?.abn, includeHistoricalDetails: 'N' }],
    queryFn: () =>
      getSearchABN({ abn: registrationData?.abn ?? '', includeHistoricalDetails: 'N' }, registrationToken ?? ''),
    enabled: enableABNFetching,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retryOnMount: false,
    onError: (error: AxiosError) => {
      if (ZEMBL_DEBUG_MODE) console.log('SEARCH_ABN_QUERY_ERROR', error, 'REQ:')
      handleErrorResponse(error)
    },
    onSuccess: (data: ABNResponse) => {
      const hasException = !!data?.ABRPayloadSearchResults?.response?.exception
      const responseABN = data?.ABRPayloadSearchResults?.response?.businessEntity202001?.ABN?.identifierValue
      const entityStatusCode =
        data?.ABRPayloadSearchResults?.response?.businessEntity202001?.entityStatus?.entityStatusCode

      const abnMainNameObject = data?.ABRPayloadSearchResults?.response?.businessEntity202001?.mainName
      const abnBusinessName = isArray(abnMainNameObject)
        ? abnMainNameObject[0]?.organisationName
        : abnMainNameObject?.organisationName

      const abnInactive = entityStatusCode !== ABN_ACTIVE
      const abnNotMatched = responseABN !== registrationData?.abn

      if (hasException || abnNotMatched || abnInactive) {
        navigate('/abn-error', { replace: true })
      } else {
        const accountName = abnBusinessName ?? responseABN
        setRegistrationData((prev) => ({ ...prev, accountName, legalName: accountName }))
        navigate('/basic-info-2')
      }
    },
  })

  const validateReCaptchaMutation = useMutation({
    mutationFn: (token: string) => postValidateReCaptcha(token, registrationToken ?? ''),
    onError: (error: AxiosError, req) => {
      if (ZEMBL_DEBUG_MODE) console.log('VALIDATE_RECAPTCHA_ERROR', error, 'REQ:', req)
      handleErrorResponse(error)
    },
  })

  const createLeadMutation = useMutation({
    mutationFn: (lead: Lead) => postCreateLead(lead, registrationToken ?? ''),
    onError: (error: AxiosError, req) => {
      if (ZEMBL_DEBUG_MODE) console.log('CREATE_LEAD_MUTATION_ERROR:', error, 'REQ:', req)
      handleErrorResponse(error)
    },
    onSuccess: (data, lead) => {
      const responseLead = data?.processLeadOutput
      const accessToken = data?.accessToken
      setRegistrationToken(accessToken)
      setRegistrationData((prev) => ({
        ...prev,
        ...responseLead,
        ...lead,
        leadId: responseLead?.id,
      }))
    },
  })

  const updateLeadMutation = useMutation({
    mutationFn: (lead: Lead) => patchUpdateLead(lead, registrationToken ?? ''),
    onError: (error: AxiosError, req) => {
      if (ZEMBL_DEBUG_MODE) console.log('UPDATE_LEAD_MUTATION_ERROR:', error, 'REQ:', req)
      handleErrorResponse(error)
    },
    onSuccess: (data, lead) => {
      const responseLead = data?.processLeadOutput
      // return
      if (location.pathname !== '/basic-info-2') {
        setRegistrationData((prev) => ({ ...prev, ...responseLead, ...lead, leadId: responseLead?.id }))
      } else {
        setRegistrationData((prev) => ({ ...prev, status: responseLead?.status }))
      }
      if (responseLead?.recordType === CAndI_VALUE) {
        navigate('/zembl-assist')
      } else if (responseLead?.recordType === RESIDENTIAL_VALUE) {
        navigate('/basic-info-2')
      } else {
        setEnableABNFetching(
          !!responseLead?.abn &&
            !!registrationToken &&
            responseLead?.recordType === SME_VALUE &&
            responseLead?.status !== LEAD_STATUS_CONVERTED_WON,
        )
      }
    },
  })

  const createSiteMutation = useMutation({
    mutationFn: (site: Site) => postCreateSite(site, registrationToken ?? ''),
    onError: (error: AxiosError, req) => {
      if (ZEMBL_DEBUG_MODE) console.log('CREATE_SITE_MUTATION_ERROR', error, 'REQ:', req)
      handleErrorResponse(error)
    },
    onSuccess: (data: SiteResponse, site) => {
      setEnableABNFetching(false)
      setRegistrationData((prev) => {
        return {
          ...prev,
          ...site,
          siteId: data?.processSiteOutput?.siteId,
          siteRelationshipId: data?.processSiteOutput?.siteRelationshipId,
        }
      })
    },
  })

  const uploadFileMutation = useMutation({
    mutationFn: (file: SFFile) => postUploadAttachment(file, registrationToken ?? ''),
    onError: (error: AxiosError, req) => {
      if (ZEMBL_DEBUG_MODE) console.log('UPLOAD_FILE_MUTATION_ERROR', error, 'REQ:', req)
      handleErrorResponse(error)
    },
  })

  const ocrFileMutation = useMutation({
    mutationFn: ({ file }: OCRMutationPayload) => postUploadOCR(file, registrationToken ?? ''),
    onError: (error: AxiosError, req) => {
      if (ZEMBL_DEBUG_MODE) console.log('OCR_FILE_MUTATION_ERROR', error, 'REQ:', req)
      handleErrorResponse(error)
    },
  })

  const createAccountMutation = useMutation({
    mutationFn: (data: Account) => postCreateAccount(data, registrationToken ?? ''),
    onSuccess: (data: QuoteResponse) => {
      const quoteData = data?.processQuoteOutput
      setRegistrationData((prev) => ({
        ...prev,
        ...quoteData,
        connectionDetails: { ...(prev.address as GoogleMapExtractedComponents), ...quoteData?.connectionDetails },
        phone: prev?.phone?.replace('+', ''),
        mobile: (prev?.mobile ?? prev?.phone)?.replace('+', ''),
      }))
      setRegistrationToken(data?.accessToken ?? '')
      navigate('/plans')
    },
    onError: (error: AxiosError, req) => {
      if (ZEMBL_DEBUG_MODE) console.log('CREATE_ACCOUNT_MUTATION_ERROR', error, 'REQ:', req)
      handleErrorResponse(error)
    },
  })

  const updateQuoteMutation = useMutation({
    mutationFn: (data: Partial<Quote>) => patchUpdateQuote(data, registrationToken ?? ''),
    onError: (error: AxiosError, req) => {
      if (ZEMBL_DEBUG_MODE) console.log('UPDATE_QUOTE_MUTATION_ERROR:', error, 'REQ:', req)
      handleErrorResponse(error)
    },
  })

  const createQuoteMutation = useMutation({
    mutationFn: (data: PostCreateQuotePayload) => postCreateQuote(data, registrationToken ?? ''),
    onSuccess: (data: QuoteResponse, quoteData: PostCreateQuotePayload) => {
      setRegistrationData((prev) => ({ ...prev, ...quoteData, ...data?.processQuoteOutput }))
      setRegistrationToken(data?.accessToken ?? '')
    },
    onError: (error: AxiosError, req) => {
      if (ZEMBL_DEBUG_MODE) console.log('CREATE_QUOTE_MUTATION_ERROR:', error, 'REQ:', req)
      handleErrorResponse(error)
    },
  })

  const createQuoteLineMutation = useMutation({
    mutationFn: (payload: CreateQuoteLinePayload) => postCreateQuoteLine(payload, registrationToken ?? ''),
    onError: (error: AxiosError, req) => {
      if (ZEMBL_DEBUG_MODE) console.log('POST_CREATE_QUOTE_LINE_ERROR', error, 'REQ:', req)
      handleErrorResponse(error)
    },
  })

  const updateProfileMutation = useMutation({
    mutationFn: (payload: MainProfile) => patchUpdateProfile(payload, registrationToken ?? ''),
    onSuccess: (_: UpdateProfileResponse, profileData: MainProfile) => {
      setRegistrationData((prev) => ({ ...prev, ...profileData }))
      navigate('/personal-detail-2')
    },
    onError: (error: AxiosError, req) => {
      if (ZEMBL_DEBUG_MODE) console.log('PATCH_UPDATE_PROFILE_ERROR', error, 'REQ:', req)
      handleErrorResponse(error)
    },
  })

  const sendQuoteEmailMutation = useMutation({
    mutationFn: () => postConfirmQuote(buildConfirmQuotePayload(registrationData), registrationToken ?? ''),
    onError: (error: AxiosError, req) => {
      if (ZEMBL_DEBUG_MODE) console.log('POST_CONFIRM_QUOTE_ERROR', error, 'REQ:', req)
      handleErrorResponse(error)
    },
  })

  useEffect(() => {
    if (!['/', '/energy', '/verification-code'].includes(location.pathname) && !registrationToken) navigate('/')
  }, [location.pathname, navigate, registrationToken])

  const isLoading =
    validateReCaptchaMutation.isLoading ||
    createLeadMutation.isLoading ||
    updateLeadMutation.isLoading ||
    searchABNQuery.isLoading ||
    createSiteMutation.isLoading ||
    ocrFileMutation.isLoading ||
    createAccountMutation.isLoading ||
    createQuoteMutation.isLoading ||
    createQuoteLineMutation.isLoading ||
    updateProfileMutation.isLoading ||
    sendQuoteEmailMutation.isLoading

  return (
    <RegistrationContext.Provider
      value={{
        registrationData,
        registrationToken,
        setRegistrationData,
        setRegistrationToken,
        validateReCaptchaMutation,
        createLeadMutation,
        updateLeadMutation,
        uploadFileMutation,
        searchABNQuery,
        createSiteMutation,
        ocrFileMutation,
        createAccountMutation,
        updateQuoteMutation,
        createQuoteMutation,
        createQuoteLineMutation,
        updateProfileMutation,
        sendQuoteEmailMutation,
        handleErrorResponse,
        isLoading,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  )
}

interface RegistrationActions {
  setRegistrationData: Dispatch<SetStateAction<RegistrationData>>
  setRegistrationToken: Dispatch<SetStateAction<string | null | undefined>>
  registrationData: RegistrationData
  registrationToken: string | null | undefined
  validateReCaptchaMutation: UseMutationResult<ReCaptchaValidateResponse, AxiosError, string>
  createLeadMutation: UseMutationResult<LeadResponse, AxiosError, Lead>
  updateLeadMutation: UseMutationResult<LeadResponse, AxiosError, Lead>
  uploadFileMutation: UseMutationResult<CommonResponse, AxiosError, SFFile>
  searchABNQuery: UseQueryResult<ABNResponse, AxiosError>
  createSiteMutation: UseMutationResult<SiteResponse, AxiosError, Site>
  ocrFileMutation: UseMutationResult<OCRFileResult, AxiosError, OCRMutationPayload>
  createAccountMutation: UseMutationResult<QuoteResponse, AxiosError, Account>
  updateQuoteMutation: UseMutationResult<Quote, AxiosError, Quote>
  createQuoteMutation: UseMutationResult<QuoteResponse, AxiosError, PostCreateQuotePayload>
  createQuoteLineMutation: UseMutationResult<CreateQuoteLineResponse, AxiosError, CreateQuoteLinePayload>
  updateProfileMutation: UseMutationResult<UpdateProfileResponse, AxiosError, MainProfile>
  sendQuoteEmailMutation: UseMutationResult<SimpleResponse, AxiosError, void>
  handleErrorResponse: (error: AxiosError, message?: string) => void
  isLoading: boolean
}

RegistrationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RegistrationContext
