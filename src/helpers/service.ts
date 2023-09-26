import axios, { Axios, AxiosError, AxiosHeaders } from 'axios'
import { isArray } from 'lodash'
import { CONFIG_ERROR, NO_RESPONSE_ERROR, REQUEST_BASE_URL, SESSION_TOKEN_KEY } from '../constants'

interface ErrorInfo {
  statusCode: number | null
  message: string
  error: string
}

export const setSessionToken = (token: string | undefined | null) =>
  token ? sessionStorage.setItem(SESSION_TOKEN_KEY, token) : null
export const getSessionToken = (): string | null => sessionStorage.getItem(SESSION_TOKEN_KEY)
export const deleteSessionToken = () => sessionStorage.removeItem(SESSION_TOKEN_KEY)

export const getAxiosInstance = (token: string) => {
  const instance: Axios = axios.create({
    baseURL: REQUEST_BASE_URL,
    timeout: 5 * 60 * 1000,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    timeoutErrorMessage: 'Request Timeout',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const errorResponse = error.response
      if (errorResponse?.status === 401) {
        deleteSessionToken()
      }
      return Promise.reject(error)
    },
  )

  return instance
}

export const performGetRequest = async (path: string, params: object, token: string, headers?: AxiosHeaders) => {
  const axios = getAxiosInstance(token)

  return await axios.get(path, { params, headers })
}

export const performPostRequest = async (path: string, data: object, token: string, headers?: AxiosHeaders) => {
  const axios = getAxiosInstance(token)

  return await axios.post(path, data, { headers })
}

export const performPutRequest = async (path: string, data: object, token: string, headers?: AxiosHeaders) => {
  const axios = getAxiosInstance(token)

  return await axios.put(path, data, { headers })
}

export const performPatchRequest = async (path: string, data: object, token: string, headers?: AxiosHeaders) => {
  const axios = getAxiosInstance(token)

  return await axios.patch(path, data, { headers })
}

export const performDeleteRequest = async (path: string, params: object, token: string, headers?: AxiosHeaders) => {
  const axios = getAxiosInstance(token)

  return await axios.delete(path, { params, headers })
}

// TBD: Implement this
const buildAPIError = (type: string, message: string): ErrorInfo => ({
  statusCode: null,
  message,
  error: type,
})

export const getAPIRequestError = (error: AxiosError) => {
  // console.log(error)
  // console.log('Error Data', { ...error })

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Request error with response')

    if (isArray(error.response.data)) {
      const message =
        'Error with following message: ' +
        error.response.data.reduce((message: string, errorInfo: ErrorInfo) => message + `${errorInfo.message} `, '')
      return { message, statusCode: error.response.status }
    }

    return error.response.data
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error('Request error without response')

    return buildAPIError(NO_RESPONSE_ERROR, 'No response from server')
  } else {
    // Something happened in setting up the request that triggered an Error
    const errorMessage = `Request error before request: ${error.message}`
    console.error(errorMessage)

    return buildAPIError(CONFIG_ERROR, errorMessage)
  }
  // console.log(error.config)
}
