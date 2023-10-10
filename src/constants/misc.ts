export const ZEMBL_WEBSITE_LINK = `${import.meta.env.VITE_ZEMBL_WEBSITE_LINK ?? 'https://zembl.com.au'}`
export const ZEMBL_PHONE_NUMBER = `${import.meta.env.VITE_ZEMBL_PHONE ?? 'https://zembl.com.au'}`
export const ZEMBL_EMAIL = `${import.meta.env.VITE_ZEMBL_EMAIL ?? 'https://zembl.com.au'}`

export const ZEMBL_DEBUG_MODE = !!import.meta.env.SAVE_ERROR_LOG_ENDPOINT ?? false
