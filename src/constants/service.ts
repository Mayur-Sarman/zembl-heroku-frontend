/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const REQUEST_BASE_URL = `${import.meta.env.VITE_SERVICE_BASE_URL}`
export const REQUEST_BASE_URL_AUS = `${import.meta.env.VITE_SERVICE_BASE_URL_AUS}`
export const SESSION_TOKEN_KEY = `${import.meta.env.VITE_SESSION_STORAGE_PREFIX}_${
  import.meta.env.VITE_ACCESS_TOKEN_KEY
}`

export const GOOGLE_TAG_MANAGER_ID = `${import.meta.env.GOOGLE_TAG_MANAGER_ID ?? 'GTM-5NWKWTD'}`

export const NO_RESPONSE_ERROR = 'No Response'
export const CONFIG_ERROR = 'Config Error'

export const BACK_TO_ZEMBL_NAVIGATE = `${import.meta.env.VITE_SERVICE_BACK_TO_ZEMBL_URL ?? 'https://www.zembl.com.au/'}`

export const CREATE_LEAD_ENDPOINT = `${import.meta.env.VITE_SERVICE_CREATE_LEAD_ENDPOINT ?? '/mule/api/public/zembl-energy/personal-detail/customer'}`
export const UPDATE_LEAD_ENDPOINT = `${import.meta.env.VITE_SERVICE_UPDATE_LEAD_ENDPOINT ?? '/mule/api/zembl-energy/personal-detail/customer'}`
export const UPLOAD_FILE_ENDPOINT = `${import.meta.env.VITE_SERVICE_UPLOAD_FILE_ENDPOINT ?? '/mule/api/zembl-energy/file/upload'}`
export const CREATE_SITE_ENDPOINT = `${import.meta.env.VITE_SERVICE_CREATE_SITE_ENDPOINT ?? '/mule/api/zembl-energy/personal-detail/address'}`
export const CREATE_ACCOUNT_ENDPOINT = `${import.meta.env.VITE_SERVICE_CREATE_ACCOUNT_ENDPOINT ?? '/mule/api/zembl-energy/process/products'}`
export const CREATE_QUOTE_ENDPOINT = `${import.meta.env.VITE_SERVICE_CREATE_QUOTE_ENDPOINT ?? '/mule/api/zembl-energy/quote/products'}`
export const CREATE_QUOTE_LINE_ENDPOINT = `${import.meta.env.VITE_SERVICE_CREATE_QUOTE_LINE_ENDPOINT ?? '/mule/api/zembl-energy/process/quote-line'}`
export const UPDATE_MAIN_PROFILE_ENDPOINT = `${import.meta.env.VITE_SERVICE_UPDATE_MAIN_PROFILE_ENDPOINT ?? '/mule/api/zembl-energy/personal-detail/crm'}`
export const ADD_ADDITIONAL_PROFILE_DETAIL_ENDPOINT = `${import.meta.env.VITE_SERVICE_ADD_ADDITIONAL_PROFILE_DETAIL_ENDPOINT ?? '/mule/api/zembl-energy/personal-detail/account'}`
export const SEND_QUOTE_EMAIL_ENDPOINT = `${import.meta.env.VITE_SERVICE_SEND_QUOTE_EMAIL_ENDPOINT ?? '/mule/api/zembl-energy/verification/send-verification-link'}`
export const GET_QUOTE_TOKEN_AND_SEND_OTP_ENDPOINT = `${import.meta.env.VITE_SERVICE_GET_QUOTE_TOKEN_AND_SEND_OTP_ENDPOINT ?? '/mule/api/zembl-energy/verification/quote-token'}`
export const VALIDATE_LINK_ENDPOINT = `${import.meta.env.VITE_SERVICE_VALIDATE_LINK_ENDPOINT ?? '/mule/api/zembl-energy/verification/validate-quote'}`
export const RESEND_OTP_ENDPOINT = `${import.meta.env.VITE_SERVICE_RESEND_OTP_ENDPOINT ?? '/mule/api/zembl-energy/verification/send-otp'}`
export const VALIDATE_OTP_ENDPOINT = `${import.meta.env.VITE_SERVICE_VALIDATE_OTP_ENDPOINT ?? '/mule/api/zembl-energy/verification/validate-otp'}`
export const GET_QUOTE_ENDPOINT = `${import.meta.env.VITE_SERVICE_GET_QUOTE_ENDPOINT ?? '/mule/api/zembl-energy/quote/plan'}`
export const UPDATE_QUOTE_ENDPOINT = `${import.meta.env.VITE_SERVICE_UPDATE_QUOTE_ENDPOINT ?? '/mule/api/zembl-energy/quote/plan'}`
export const UPDATE_QUOTE_CALLBACK_ENDPOINT = `${import.meta.env.VITE_SERVICE_UPDATE_QUOTE_CALLBACK_ENDPOINT ?? '/mule/api/zembl-energy/quote/callback'}`
export const GET_REZEMBL_DETAILS_ENDPOINT = `${import.meta.env.VITE_SERVICE_GET_REZEMBL_DETAILS_ENDPOINT ?? '/mule/api/zembl-energy/quote/rezembl-details'}`
export const UPDATE_REZEMBL_CONSENT_ENDPOINT = `${import.meta.env.VITE_SERVICE_UPDATE_REZEMBL_CONSENT_ENDPOINT ?? '/mule/api/zembl-energy/account/rezembl-terms'}`
export const VALIDATE_RE_CAPTCHA_ENDPOINT = `${import.meta.env.VITE_SERVICE_VALIDATE_RE_CAPTCHA_ENDPOINT ?? '/mule/api/zembl-energy/secure/re-captcha'}`
export const PROCESS_OCR_ENDPOINT = `${import.meta.env.VITE_SERVICE_PROCESS_OCR_ENDPOINT ?? '/mule/api/zembl-energy/ocr/process'}`
export const SEARCH_ABN_ENDPOINT = `${import.meta.env.VITE_SERVICE_SEARCH_ABN_ENDPOINT ?? '/api/abn/v202001/search/mule/api/zembl-energy/abn/v202001/search'}`
export const SAVE_ERROR_LOG_ENDPOINT = `${import.meta.env.VITE_SERVICE_SAVE_ERROR_LOG_ENDPOINT ?? '/mule/api/zembl-energy/common/log'}`
export const GET_QUOTE_LIST_ENDPOINT = `${import.meta.env.VITE_SERVICE_GET_QUOTE_LIST_ENDPOINT ?? '/mule/api/zembl-energy/quote/list'}`