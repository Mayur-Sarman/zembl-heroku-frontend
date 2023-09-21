import { Dispatch, PropsWithChildren, SetStateAction, createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ABN_ACTIVE, CAndI_VALUE, RESIDENTIAL_VALUE, RegistrationData, SME_VALUE } from '../constants'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query'
import { Lead, LeadResponse, patchUpdateLead, postCreateLead } from '../api/lead'
import { SFFile, postUploadAttachment } from '../api/file'
import { CommonResponse } from '../api/common'
import { useLocation, useNavigate } from 'react-router-dom'
import { ABNResponse, getSearchABN } from '../api/abn'
import { Site, SiteResponse, postCreateSite } from '../api/site'
import { OCRFileResult, postUploadOCR } from '../api/ocr'
import { OCRMutationPayload } from '../helpers/ocr'

export const RegistrationContext = createContext({} as RegistrationActions)
export const RegistrationContextProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [registrationData, setRegistrationData] = useState<RegistrationData>({} as RegistrationData)
  const [registrationToken, setRegistrationToken] = useState<string | null | undefined>(null)

  const searchABNQuery = useQuery({
    queryKey: ['searchABN', { abn: registrationData.abn, includeHistoricalDetails: 'N' }],
    queryFn: () =>
      getSearchABN({ abn: registrationData.abn ?? '', includeHistoricalDetails: 'N' }, registrationToken ?? ''),
    enabled: !!registrationData.abn && !!registrationToken && registrationData.recordType === SME_VALUE,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retryOnMount: false,
    onError: (error) => console.log('SEARCH_ABN_QUERY_ERROR', error),
    onSuccess: (data: ABNResponse) => {
      console.log('ABN RES:', data)
      const hasException = !!data?.ABRPayloadSearchResults?.response?.exception
      const abnNotMatched =
        data?.ABRPayloadSearchResults?.response?.businessEntity202001?.ABN?.identifierValue !== registrationData?.abn
      const abnInactive =
        data?.ABRPayloadSearchResults?.response?.businessEntity202001?.entityStatus?.entityStatusCode !== ABN_ACTIVE

      if (hasException || abnNotMatched || abnInactive) {
        navigate('/abn-error', { replace: true })
      } else {
        navigate('/basic-info-2')
      }
    },
  })

  const createLeadMutation = useMutation({
    mutationFn: (lead: Lead) => postCreateLead(lead, registrationToken ?? ''),
    onError: (error) => console.log('CREATE_LEAD_MUTATION_ERROR:', error),
    onSuccess: (data) => {
      console.log('CREATE_LEAD_MUTATION_DATA:', data)
      const responseLead = data?.processLeadOutput
      const accessToken = data?.accessToken
      setRegistrationToken(accessToken)
      setRegistrationData((prev) => ({ ...prev, ...responseLead, leadId: responseLead?.id }))
    },
  })

  const updateLeadMutation = useMutation({
    mutationFn: (lead: Lead) => patchUpdateLead(lead, registrationToken ?? ''),
    onError: (error) => console.log('UPDATE_LEAD_MUTATION_ERROR:', error),
    onSuccess: (data) => {
      console.log('UPDATE_LEAD_MUTATION_DATA:', data)
      const responseLead = data?.processLeadOutput
      setRegistrationData((prev) => ({ ...prev, ...responseLead, leadId: responseLead?.id }))
      if (responseLead?.recordType === CAndI_VALUE) {
        navigate('/zembl-assist')
      } else if (responseLead?.recordType === RESIDENTIAL_VALUE) {
        navigate('/basic-info-2')
      }
    },
  })

  const createSiteMutation = useMutation({
    mutationFn: (site: Site) => postCreateSite(site, registrationToken ?? ''),
    onError: (error) => console.log('CREATE_SITE_MUTATION_ERROR:', error),
    onSuccess: (data) => {
      console.log('CREATE_SITE_MUTATION_DATA:', data)
    },
  })

  const uploadFileMutation = useMutation({
    mutationFn: (file: SFFile) => postUploadAttachment(file, registrationToken ?? ''),
    onError: (error) => console.log('UPLOAD_FILE_MUTATION_ERROR:', error),
  })

  const ocrFileMutation = useMutation({
    mutationFn: ({ file }: OCRMutationPayload) => postUploadOCR(file, registrationToken ?? ''),
    // onSuccess: (data, req) => {
    //   const type = req.type ?? null
    //   console.log('OCR TYPE:', type)
    //   const extractedKeyPair = extractKeyPair(data)
    //   console.log('OCR KEYPAIR:', extractedKeyPair)

    //   let mirn: string | undefined = registrationData.mirn as string
    //   if (type === GAS_VALUE) {
    //     mirn = extractMIRNByKeypair(extractedKeyPair)

    //     if (!mirn) {
    //       const possibleMIRN = extractMIRNByText(data.document.text)
    //       console.log('POSSIBLE MIRN', possibleMIRN)
    //       mirn = possibleMIRN?.match(CODE_PATTERN)?.[0]
    //     }

    //     console.log('RESULT MIRN:', mirn)
    //   }

    //   let nmi: string | undefined = registrationData.nmi as string
    //   if (type === ELECTRICITY_VALUE) {
    //     nmi = extractNMIByKeypair(extractedKeyPair)

    //     if (!nmi) {
    //       const possibleNMI = extractNMIByText(data.document.text)
    //       console.log('POSSIBLE NMI', possibleNMI)
    //       nmi = possibleNMI?.match(CODE_PATTERN)?.[0]
    //     }

    //     console.log('RESULT NMI:', nmi)
    //   }

    //   const shouldSwitchHavePaperBill =
    //     (!nmi && registrationData.energyType !== GAS_VALUE) ||
    //     (!mirn && registrationData.energyType !== ELECTRICITY_VALUE)

    //   setRegistrationData((prev) => ({
    //     ...prev,
    //     nmi,
    //     mirn,
    //     billFileType: shouldSwitchHavePaperBill ? HAVE_PAPER_BILL : registrationData.billFileType,
    //   }))
    // },
    onError: (error, req) => console.log('OCR_FILE_MUTATION_ERROR:', error, 'REQ:', req),
  })

  // const createAccountMutation = useMutation({
  //   mutationFn: () => ''
  // })

  console.log('registrationData:', registrationData)

  useEffect(() => {
    if (!['/', '/energy'].includes(location.pathname) && !registrationToken) navigate('/')
  }, [location.pathname, navigate, registrationToken])

  const isLoading =
    createLeadMutation.isLoading ||
    updateLeadMutation.isLoading ||
    searchABNQuery.isLoading ||
    createSiteMutation.isLoading ||
    ocrFileMutation.isLoading

  return (
    <RegistrationContext.Provider
      value={{
        registrationData,
        registrationToken,
        setRegistrationData,
        createLeadMutation,
        updateLeadMutation,
        uploadFileMutation,
        searchABNQuery,
        createSiteMutation,
        ocrFileMutation,
        isLoading,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  )
}

interface RegistrationActions {
  setRegistrationData: Dispatch<SetStateAction<RegistrationData>>
  registrationData: RegistrationData
  registrationToken: string | null | undefined
  createLeadMutation: UseMutationResult<LeadResponse, unknown, Lead>
  updateLeadMutation: UseMutationResult<LeadResponse, unknown, Lead>
  uploadFileMutation: UseMutationResult<CommonResponse, unknown, SFFile>
  searchABNQuery: UseQueryResult<ABNResponse, unknown>
  createSiteMutation: UseMutationResult<SiteResponse, unknown, Site>
  ocrFileMutation: UseMutationResult<OCRFileResult, unknown, OCRMutationPayload>
  isLoading: boolean
}

RegistrationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RegistrationContext
