import { GOOGLE_RECAPTCHA_SECRET_KEY, VALIDATE_RE_CAPTCHA_ENDPOINT } from '../constants'
import { performPostRequest } from '../helpers'

export const postValidateReCaptcha = async (recaptchaToken: string, token: string) => {
  const response = await performPostRequest(
    VALIDATE_RE_CAPTCHA_ENDPOINT,
    { response: recaptchaToken, secret: GOOGLE_RECAPTCHA_SECRET_KEY } as ValidateReCaptchaRequestPayload,
    token,
  )
  return response.data as ReCaptchaValidateResponse
}

export interface ValidateReCaptchaRequestPayload {
  secret: string
  response: string
}

export interface ReCaptchaValidateResponse {
  success?: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}
