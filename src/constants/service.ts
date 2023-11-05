/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const REQUEST_BASE_URL = `${import.meta.env.VITE_SERVICE_BASE_URL}`
export const SESSION_TOKEN_KEY = `${import.meta.env.VITE_SESSION_STORAGE_PREFIX}_${
  import.meta.env.VITE_ACCESS_TOKEN_KEY
}`

export const NO_RESPONSE_ERROR = 'No Response'
export const CONFIG_ERROR = 'Config Error'

export const CREATE_LEAD_ENDPOINT = `${import.meta.env.VITE_SERVICE_CREATE_LEAD_ENDPOINT ?? '/api/public/crm/lead'}`
export const UPDATE_LEAD_ENDPOINT = `${import.meta.env.VITE_SERVICE_UPDATE_LEAD_ENDPOINT ?? '/api/crm/lead'}`
export const UPLOAD_FILE_ENDPOINT = `${import.meta.env.VITE_SERVICE_UPLOAD_FILE_ENDPOINT ?? '/api/file/upload'}`
export const CREATE_SITE_ENDPOINT = `${import.meta.env.VITE_SERVICE_CREATE_SITE_ENDPOINT ?? '/api/crm/site'}`
export const CREATE_ACCOUNT_ENDPOINT = `${import.meta.env.VITE_SERVICE_CREATE_ACCOUNT_ENDPOINT ?? '/api/crm/account'}`
export const CREATE_QUOTE_ENDPOINT = `${import.meta.env.VITE_SERVICE_CREATE_QUOTE_ENDPOINT ?? '/api/crm/quote'}`
export const CREATE_QUOTE_LINE_ENDPOINT = `${import.meta.env.VITE_SERVICE_CREATE_QUOTE_LINE_ENDPOINT ?? '/api/crm/quote-line'}`
export const UPDATE_MAIN_PROFILE_ENDPOINT = `${import.meta.env.VITE_SERVICE_UPDATE_MAIN_PROFILE_ENDPOINT ?? '/api/crm/main-profile'}`
export const ADD_ADDITIONAL_PROFILE_DETAIL_ENDPOINT = `${import.meta.env.VITE_SERVICE_ADD_ADDITIONAL_PROFILE_DETAIL_ENDPOINT ?? '/api/crm/secondary-profile'}`
export const SEND_QUOTE_EMAIL_ENDPOINT = `${import.meta.env.VITE_SERVICE_SEND_QUOTE_EMAIL_ENDPOINT ?? '/api/verification/generate-tc-link'}`
export const GET_QUOTE_TOKEN_AND_SEND_OTP_ENDPOINT = `${import.meta.env.VITE_SERVICE_GET_QUOTE_TOKEN_AND_SEND_OTP_ENDPOINT ?? '/api/verification/generate-token-and-otp'}`
export const VALIDATE_LINK_ENDPOINT = `${import.meta.env.VITE_SERVICE_VALIDATE_LINK_ENDPOINT ?? '/api/crm/lead'}`
export const RESEND_OTP_ENDPOINT = `${import.meta.env.VITE_SERVICE_RESEND_OTP_ENDPOINT ?? '/api/verification/send-otp'}`
export const VALIDATE_OTP_ENDPOINT = `${import.meta.env.VITE_SERVICE_VALIDATE_OTP_ENDPOINT ?? '/api/verification/validate-quote'}`
export const GET_QUOTE_ENDPOINT = `${import.meta.env.VITE_SERVICE_GET_QUOTE_ENDPOINT ?? '/api/quote/plan'}`
export const UPDATE_QUOTE_ENDPOINT = `${import.meta.env.VITE_SERVICE_UPDATE_QUOTE_ENDPOINT ?? '/api/quote/plan'}`
export const UPDATE_QUOTE_CALLBACK_ENDPOINT = `${import.meta.env.VITE_SERVICE_UPDATE_QUOTE_CALLBACK_ENDPOINT ?? '/api/quote/callback'}`
export const GET_REZEMBL_DETAILS_ENDPOINT = `${import.meta.env.VITE_SERVICE_GET_REZEMBL_DETAILS_ENDPOINT ?? '/api/quote/rezembl-details'}`
export const UPDATE_REZEMBL_CONSENT_ENDPOINT = `${import.meta.env.VITE_SERVICE_UPDATE_REZEMBL_CONSENT_ENDPOINT ?? '/api/quote/rezembl-terms'}`
export const VALIDATE_RE_CAPTCHA_ENDPOINT = `${import.meta.env.VITE_SERVICE_VALIDATE_RE_CAPTCHA_ENDPOINT ?? '/api/secure/re-captcha'}`
export const PROCESS_OCR_ENDPOINT = `${import.meta.env.VITE_SERVICE_PROCESS_OCR_ENDPOINT ?? '/api/file/ocr'}`
export const SEARCH_ABN_ENDPOINT = `${import.meta.env.VITE_SERVICE_SEARCH_ABN_ENDPOINT ?? '/api/abn/v202001/search'}`
export const SAVE_ERROR_LOG_ENDPOINT = `${import.meta.env.VITE_SERVICE_SAVE_ERROR_LOG_ENDPOINT ?? '/api/log'}`