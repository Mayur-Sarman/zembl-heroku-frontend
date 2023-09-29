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

export const RegistrationContext = createContext({} as RegistrationActions)
export const RegistrationContextProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [registrationData, setRegistrationData] = useState<RegistrationData>({} as RegistrationData)
  const [registrationToken, setRegistrationToken] = useState<string | null | undefined>(null)
  const [enableABNFetching, setEnableABNFetching] = useState<boolean>(false)

  // TODO: *** INVALIDATE SESSION IF ALL API STATUS CODE = 401 ***

  const searchABNQuery = useQuery({
    queryKey: ['searchABN', { abn: registrationData?.abn, includeHistoricalDetails: 'N' }],
    queryFn: () =>
      getSearchABN({ abn: registrationData?.abn ?? '', includeHistoricalDetails: 'N' }, registrationToken ?? ''),
    enabled: enableABNFetching,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retryOnMount: false,
    onError: (error) => console.log('SEARCH_ABN_QUERY_ERROR', error),
    onSuccess: (data: ABNResponse) => {
      console.log('ABN RES:', data)
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
  })

  const createLeadMutation = useMutation({
    mutationFn: (lead: Lead) => postCreateLead(lead, registrationToken ?? ''),
    onError: (error) => console.log('CREATE_LEAD_MUTATION_ERROR:', error),
    onSuccess: (data, lead) => {
      console.log('CREATE_LEAD_MUTATION_DATA:', data)
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
    onError: (error) => console.log('UPDATE_LEAD_MUTATION_ERROR:', error),
    onSuccess: (data, lead) => {
      console.log('UPDATE_LEAD_MUTATION_DATA:', data)
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
    onError: (error) => console.log('CREATE_SITE_MUTATION_ERROR:', error),
    onSuccess: (data: SiteResponse, site) => {
      setEnableABNFetching(false)
      console.log('CREATE_SITE_MUTATION_DATA:', data, site)
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
    onError: (error) => console.log('UPLOAD_FILE_MUTATION_ERROR:', error),
  })

  const ocrFileMutation = useMutation({
    mutationFn: ({ file }: OCRMutationPayload) => postUploadOCR(file, registrationToken ?? ''),
    onError: (error, req) => console.log('OCR_FILE_MUTATION_ERROR:', error, 'REQ:', req),
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
      // createQuoteTokenMutation.mutate('a0I0T000001ZA8TUAW')
      setRegistrationToken(data?.accessToken ?? '')
      navigate('/plans')
    },
    onError: (error, req) => {
      console.log('CREATE_ACCOUNT_MUTATION_ERROR:', error, 'REQ:', req)
      // createQuoteTokenMutation.mutate('a0I0T000001ZAjKUAW')
    },
  })

  const updateQuoteMutation = useMutation({
    mutationFn: (data: Partial<Quote>) => patchUpdateQuote(data, registrationToken ?? ''),
    // onSuccess: (data: Partial<Quote>, quoteData: Partial<Quote>) => {
    //   setRegistrationData((prev) => ({ ...prev, ...quoteData, ...data }))
    // },
    onError: (error, req) => console.log('CREATE_ACCOUNT_MUTATION_ERROR:', error, 'REQ:', req),
  })

  const createQuoteMutation = useMutation({
    mutationFn: (data: PostCreateQuotePayload) => postCreateQuote(data, registrationToken ?? ''),
    onSuccess: (data: QuoteResponse, quoteData: PostCreateQuotePayload) => {
      setRegistrationData((prev) => ({ ...prev, ...quoteData, ...data?.processQuoteOutput }))
      // createQuoteTokenMutation.mutate('a0I0T000001ZA8TUAW')
      setRegistrationToken(data?.accessToken ?? '')
    },
    onError: (error, req) => console.log('CREATE_ACCOUNT_MUTATION_ERROR:', error, 'REQ:', req),
  })

  const createQuoteLineMutation = useMutation({
    mutationFn: (payload: CreateQuoteLinePayload) => postCreateQuoteLine(payload, registrationToken ?? ''),
    // onSuccess: (data: CreateQuoteLineResponse) => {
    //   setRegistrationData((prev) => ({ ...prev, gasQuoteLineId: data.quoteLineId }))
    // },
    onError: (error, req) => console.log('POST_CREATE_QUOTE_LINE_ERROR:', error, 'REQ:', req),
  })

  const updateProfileMutation = useMutation({
    mutationFn: (payload: MainProfile) => patchUpdateProfile(payload, registrationToken ?? ''),
    onSuccess: (_: UpdateProfileResponse, profileData: MainProfile) => {
      setRegistrationData((prev) => ({ ...prev, ...profileData }))
      navigate('/personal-detail-2')
    },
    onError: (error, req) => console.log('POST_CREATE_QUOTE_LINE_ERROR:', error, 'REQ:', req),
  })

  const sendQuoteEmailMutation = useMutation({
    mutationFn: () => postConfirmQuote(buildConfirmQuotePayload(registrationData), registrationToken ?? ''),
    // onSuccess: (_: UpdateProfileResponse, profileData: MainProfile) => {},
    onError: (error, req) => console.log('POST_CONFIRM_QUOTE_ERROR:', error, 'REQ:', req),
  })

  console.log('registrationData:', registrationData)

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
  validateReCaptchaMutation: UseMutationResult<ReCaptchaValidateResponse, unknown, string>
  createLeadMutation: UseMutationResult<LeadResponse, unknown, Lead>
  updateLeadMutation: UseMutationResult<LeadResponse, unknown, Lead>
  uploadFileMutation: UseMutationResult<CommonResponse, unknown, SFFile>
  searchABNQuery: UseQueryResult<ABNResponse, unknown>
  createSiteMutation: UseMutationResult<SiteResponse, unknown, Site>
  ocrFileMutation: UseMutationResult<OCRFileResult, unknown, OCRMutationPayload>
  createAccountMutation: UseMutationResult<QuoteResponse, unknown, Account>
  updateQuoteMutation: UseMutationResult<Quote, unknown, Quote>
  createQuoteMutation: UseMutationResult<QuoteResponse, unknown, PostCreateQuotePayload>
  createQuoteLineMutation: UseMutationResult<CreateQuoteLineResponse, unknown, CreateQuoteLinePayload>
  updateProfileMutation: UseMutationResult<UpdateProfileResponse, unknown, MainProfile>
  sendQuoteEmailMutation: UseMutationResult<SimpleResponse, unknown, void>
  isLoading: boolean
}

RegistrationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RegistrationContext
