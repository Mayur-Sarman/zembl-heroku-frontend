import { AxiosHeaders } from 'axios'
import { MULESOFT_CLIENT_KEY, MULESOFT_CLIENT_SECRET } from '../constants'
import { performPostRequest } from '../helpers'
import { Preference } from './common'

export const postGenerateQuoteToken = async (quoteId: string, token: string) => {
  const headers = new AxiosHeaders()
  headers.set('client_id', MULESOFT_CLIENT_KEY)
  headers.set('client_secret', MULESOFT_CLIENT_SECRET)

  const response = await performPostRequest('/auth/token', { recordId: quoteId }, token, headers)
  return response.data as GenerateQuoteToken
}

export const postCreateQuoteLine = async (payload: CreateQuoteLinePayload, token: string) => {
  const response = await performPostRequest('/quote-line', payload, token ?? '')
  return response.data as CreateQuoteLineResponse
}

export const postCreateQuote = async (payload: PostCreateQuotePayload, quoteToken: string) => {
  const response = await performPostRequest('/quote', payload, quoteToken ?? '')
  return response.data as QuoteResponse
}

export interface PostCreateQuotePayload {
  opportunityId?: string
  accountId?: string
  contactId?: string
  categoryId?: string
  electricity?: boolean
  gas?: boolean
  preferences?: Preference
}

export interface CreateQuoteLinePayload {
  comparison: QuoteComparison
}

export interface CreateQuoteLineResponse {
  quoteLineId?: string
  comparison?: QuoteComparison
}

export interface GenerateQuoteToken {
  access_token: string
}

export interface QuoteResponse {
  processQuoteOutput?: ProcessQuoteOutput
  accessToken?: string
}

export interface ProcessQuoteOutput {
  opportunityId?: string
  businessDetails?: BusinessDetail
  accountDetails?: AccountDetail
  connectionDetails?: ConnectionDetail
  categoryId?: string
  electricityQuote?: Quote
  gasQuote?: Quote
}

export interface BusinessDetail {
  accountId?: string
  legalName?: string
  abn?: string
  position?: string
}

export interface AccountDetail {
  contactId?: string
  title?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string | Date
  email?: string
  mobile?: string
  altPhone?: string
}

export interface ConnectionDetail {
  siteId?: string | null
  street?: string | null
  city?: string | null
  state?: string | null
  postCode?: string | null
  unitNo?: string | null
  unitType?: string | null
}

export interface Quote {
  quoteId?: string
  comparisons?: QuoteComparison[]
  annualSavingIncGST?: number | null
  fuelType?: string | null
  preferenceId?: string | null
  productId?: string | null
  productName?: string | null
  quoteLineId?: string | null
  retailerId?: string | null
  retailerName?: string | null
  retailerIconLink?: string | null
  termAndConditionContent?: string | null
  termAndConditions?: string | null
}

export interface QuoteComparison {
  id?: string
  quoteId?: string
  retailerId?: string
  retailerName?: string
  retailerIconLink?: string
  productId?: string
  productName?: string

  bpidLink?: string
  detailLink?: string

  billSize?: number
  annualSavingIncGST?: number
  mandatoryInformation?: string

  planBenefits?: string[]
  planEstCostPerMonth?: number
  planEstCostPerYear?: number
  planType?: string
}
