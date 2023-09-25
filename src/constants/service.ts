/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const REQUEST_BASE_URL = `${import.meta.env.VITE_SERVICE_BASE_URL}`
export const SESSION_TOKEN_KEY = `${import.meta.env.VITE_SESSION_STORAGE_PREFIX}_${
  import.meta.env.VITE_ACCESS_TOKEN_KEY
}`

export const NO_RESPONSE_ERROR = 'No Response'
export const CONFIG_ERROR = 'Config Error'

export const MULESOFT_CLIENT_KEY = `${import.meta.env.VITE_MULESOFT_CLIENT_KEY}`
export const MULESOFT_CLIENT_SECRET = `${import.meta.env.VITE_MULESOFT_CLIENT_SECRET}`