import {
  AUSTRALIAN_OWNED,
  FIXED_PRICE,
  GREEN_OR_CARBON_NEUTRAL,
  LOCAL_CUSTOMER_SERVICE,
  LOWEST_PRICE,
  NO_PREFERENCE,
  SAVE_ERROR_LOG_ENDPOINT,
} from '../constants'
import { performPostRequest } from '../helpers'

export const convertPreference = (prefList: string[]) => {
  const preferences = {
    greenOrCarbon: prefList.includes(GREEN_OR_CARBON_NEUTRAL),
    fixedPrice: prefList.includes(FIXED_PRICE),
    australianOwned: prefList.includes(AUSTRALIAN_OWNED),
    lowestPrice: prefList.includes(LOWEST_PRICE),
    localCustomerService: prefList.includes(LOCAL_CUSTOMER_SERVICE),
    noPreferences: prefList.includes(NO_PREFERENCE),
  }
  return preferences
}

export const saveLog = async (logData: ErrorLog, token: string) => {
  const response = await performPostRequest(SAVE_ERROR_LOG_ENDPOINT, logData, token ?? '')
  return response?.data as SimpleResponse
}

export interface ErrorLog {
  errorMessage: string
  response: string
  source: string // "Web" || "Mulesoft" || "Internal"
  status: string
  endpoint: string
}

export interface Preference {
  greenOrCarbon: boolean
  fixedPrice: boolean
  australianOwned: boolean
  lowestPrice: boolean
  localCustomerService: boolean
  noPreferences: boolean
}

export interface CommonResponse {
  id?: string
  items?: CommonResponseItems[]
  successful?: boolean
}

interface CommonResponseItems {
  exception?: string
  message?: string
  payload?: CommonResponseItemPayload
  id?: string
  successful?: boolean
  statusCode?: string
}

interface CommonResponseItemPayload {
  success?: boolean
  id?: string
  errors?: CommonResponsePayloadError[]
}

interface CommonResponsePayloadError {
  duplicateResult?: unknown
  message?: string
  fields?: unknown[] | null
  statusCode?: string
}

export interface SimpleResponse {
  message?: string
  token?: string
  email?: string
  mobile?: string
}
