import { GET_REZEMBL_DETAILS_ENDPOINT, UPDATE_REZEMBL_CONSENT_ENDPOINT } from '../constants'
import { performGetRequest, performPatchRequest } from '../helpers'
import { SimpleResponse } from './common'

export const getReZemblData = async (payload: ReZemblRequestPayload, token: string) => {
  const response = await performGetRequest(GET_REZEMBL_DETAILS_ENDPOINT, payload, token)
  return response.data as ReZemblData
}

export const patchConsentReZemblTerms = async (payload: UpdateReZemblTermsConsentPayload, token: string) => {
  const response = await performPatchRequest(UPDATE_REZEMBL_CONSENT_ENDPOINT, payload, token)
  return response.data as SimpleResponse
}

export interface ReZemblRequestPayload {
  electricityQuoteId?: string
  gasQuoteId?: string
}

export interface UpdateReZemblTermsConsentPayload extends ReZemblRequestPayload {
  reZemblConsent: boolean
}

export interface ReZemblData {
  customerDetails: CustomerDetails
  electricityQuote: ReZemblQuote
  gasQuote: ReZemblQuote
}

export interface CustomerDetails {
  contactId: string // 'id'
  contactPerson: string // 'string'
  companyName: string // 'string'
  abn: string // 'string'
  position: string // 'Date'
  telephone: string // 'string'
  designatedEmail: string // 'string'
}

export interface ReZemblQuote {
  quoteId?: string // 'id'
  quoteLineId?: string | null // 'id'
  fuelType?: string | null // 'string'
  nmi?: string | null // 'string'
  mirn?: string | null // 'string'
  address?: string | null // 'string'
  nextRezemblDate?: string | null // 'date'
  termAndConditionContent?: string | null // 'Rich Text' //Just Add //on FE read By HTML parser
}
