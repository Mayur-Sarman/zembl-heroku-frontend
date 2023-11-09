import {
  GET_QUOTE_ENDPOINT,
  RegistrationData,
  CREATE_QUOTE_LINE_ENDPOINT,
  CREATE_QUOTE_ENDPOINT,
  UPDATE_QUOTE_ENDPOINT,
  SEND_QUOTE_EMAIL_ENDPOINT,
  VALIDATE_LINK_ENDPOINT,
  RESEND_OTP_ENDPOINT,
  VALIDATE_OTP_ENDPOINT,
  UPDATE_QUOTE_CALLBACK_ENDPOINT,
  GET_QUOTE_TOKEN_AND_SEND_OTP_ENDPOINT,
} from '../constants'
import { performGetRequest, performPatchRequest, performPostRequest } from '../helpers'
import { Preference, SimpleResponse } from './common'

export const postCreateQuoteLine = async (payload: CreateQuoteLinePayload, token: string) => {
  const response = await performPostRequest(CREATE_QUOTE_LINE_ENDPOINT, payload, token ?? '')
  return response.data as CreateQuoteLineResponse
}

export const postCreateQuote = async (payload: PostCreateQuotePayload, quoteToken: string) => {
  const response = await performPostRequest(CREATE_QUOTE_ENDPOINT, payload, quoteToken ?? '')
  return response.data as QuoteResponse
}

export const patchUpdateQuote = async (payload: Partial<Quote>, quoteToken: string) => {
  const response = await performPatchRequest(UPDATE_QUOTE_ENDPOINT, payload, quoteToken ?? '')
  return response.data as Quote
}

export const patchQuoteCallback = async (payload: CallbackRequestPayload, quoteToken: string) => {
  const response = await performPatchRequest(UPDATE_QUOTE_CALLBACK_ENDPOINT, payload, quoteToken ?? '')
  return response.data as SimpleResponse
}

export const postConfirmQuote = async (payload: ConfirmQuotePayload, quoteToken: string) => {
  const response = await performPostRequest(SEND_QUOTE_EMAIL_ENDPOINT, payload, quoteToken ?? '')
  return response.data as SimpleResponse
}

export const postQuoteToken = async (payload: ConfirmQuotePayload, quoteToken: string) => {
  const response = await performPostRequest(GET_QUOTE_TOKEN_AND_SEND_OTP_ENDPOINT, payload, quoteToken ?? '')
  return response.data as SimpleResponse
}

export const buildConfirmQuotePayload = (data: RegistrationData) => {
  const buildedData: ConfirmQuotePayload = {
    electricQuoteId: data.electricityQuote?.quoteId,
    gasQuoteId: data.gasQuote?.quoteId,
    accountId: data.accountDetails?.accountId,
    opportunityId: data.opportunityId,
  }
  return buildedData
}

export const postValidateToken = async (token: string) => {
  const encodedToken = encodeURIComponent(token)
  const response = await performPostRequest(
    `${VALIDATE_LINK_ENDPOINT}?token=${encodedToken}`,
    undefined,
    null,
    undefined,
  )
  return response.data as ValidateTokenResponse
}

export const postResendOTP = async (token: string) => {
  const encodedToken = encodeURIComponent(token)
  const response = await performPostRequest(`${RESEND_OTP_ENDPOINT}?token=${encodedToken}`)
  return response.data as SimpleResponse
}

export const postValidateOTP = async (otp: string, token: string) => {
  const encodedToken = encodeURIComponent(token)
  const response = await performPostRequest(`${VALIDATE_OTP_ENDPOINT}?token=${encodedToken}`, { code: otp })
  return response.data as ValidateOTPResponse
}

export const getFetchQuotePlanData = async (quoteToken: string, token: string) => {
  const encodedToken = encodeURIComponent(quoteToken)
  const response = await performGetRequest(`${GET_QUOTE_ENDPOINT}?token=${encodedToken}`, undefined, token)
  return response.data as ProcessQuoteOutput
}

export const patchUpdateQuotePlan = async (planData: ProcessQuoteOutput, token: string) => {
  const response = await performPatchRequest(UPDATE_QUOTE_ENDPOINT, planData, token)
  return response.data as SimpleResponse
}

export interface ConfirmQuotePayload {
  electricQuoteId?: string
  gasQuoteId?: string
  accountId?: string
  opportunityId?: string
}

export interface ValidateTokenResponse extends SimpleResponse {
  otpDigit?: number
  mobile?: string
  email?: string
}

export interface ValidateOTPResponse extends SimpleResponse {
  accessToken?: string
}

export interface PostCreateQuotePayload {
  opportunityId?: string
  accountId?: string
  contactId?: string
  categoryId?: string
  electricity?: boolean
  gas?: boolean
  preferences?: Preference
  siteRelationshipId?: string
  accountType?: string
}

export interface CreateQuoteLinePayload {
  comparison: QuoteComparison
}

export interface CreateQuoteLineResponse {
  quoteLineId?: string
  comparison?: QuoteComparison
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
  commonQuote?: Quote
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
  dateOfBirth?: string | Date | null
  email?: string
  mobile?: string
  phone?: string
  altPhone?: string
  accountId?: string
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

export interface CallbackRequestPayload {
  callbackRequested?: boolean | null
  electricQuoteId?: string | null
  gasQuoteId?: string | null
}

export interface Quote extends QuoteComparison {
  quoteId?: string
  comparisons?: QuoteComparison[]
  fuelType?: string | null
  preferenceId?: string | null
  quoteLineId?: string | null
  lifeSupport?: string | null
  billType?: string | null
  accountType?: string | null

  termAndConditionContent?: string | null
  termAndConditions?: TermAndCondition[]

  address?: string | null
  nmi?: string | null
  mirn?: string | null
  quotePreferences?: Record<string, unknown>
  connectionPrice?: number | null
}

export interface TermAndCondition {
  id: string
  label: string
  accepted: boolean
}

export interface QuoteComparison {
  id?: string
  quoteId?: string
  retailerId?: string
  retailerName?: string
  retailerLogo?: string
  productId?: string
  productName?: string

  linkBPID?: string
  detailLink?: string

  exitPenalty?: string
  australianOwned?: boolean
  contractLength?: string

  billSize?: number
  annualBillSize?: number
  percentDifference?: number
  annualSavingIncGST?: number
  mandatoryInformation?: string

  planType?: string
}
