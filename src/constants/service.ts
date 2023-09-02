/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const REQUEST_BASE_URL = `${import.meta.env.VITE_SERVICE_BASE_URL}`
export const ACCESS_TOKEN_KEY = `${import.meta.env.VITE_LOCAL_STORAGE_PREFIX}_${
  import.meta.env.REACT_APP_ACCESS_TOKEN_KEY
}`

export const NO_RESPONSE_ERROR = 'No Response'
export const CONFIG_ERROR = 'Config Error'
