import axios, { Axios, AxiosHeaders } from 'axios'

import { REQUEST_BASE_URL, SESSION_TOKEN_KEY, REQUEST_BASE_URL_AUS } from '../constants'

export const setSessionToken = (token: string | undefined | null) =>
  token ? sessionStorage.setItem(SESSION_TOKEN_KEY, token) : null
export const getSessionToken = (): string | null => sessionStorage.getItem(SESSION_TOKEN_KEY)
export const deleteSessionToken = () => sessionStorage.removeItem(SESSION_TOKEN_KEY)

export const getAxiosInstance = (token?: string | null) => {
  const instance: Axios = axios.create({
    baseURL: REQUEST_BASE_URL,
    timeout: 5 * 60 * 1000,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    timeoutErrorMessage: 'Request Timeout',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : null,
    },
  })

  return instance
}

export const getNewAxiosInstance = (token?: string | null) => {
  const instance: Axios = axios.create({
    baseURL: REQUEST_BASE_URL_AUS,
    timeout: 5 * 60 * 1000,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    timeoutErrorMessage: 'Request Timeout',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : null,
    },
  })

  return instance
}

export const performGetRequest = async (
  path: string,
  params?: object,
  token?: string | null,
  headers?: AxiosHeaders,
  options?: Record<string, unknown>,
) => {
  const axios = getAxiosInstance(token)

  return await axios.get(path, { params, headers, ...options })
}

export const performPostRequest = async (
  path: string,
  data?: object | null,
  token?: string | null,
  headers?: AxiosHeaders,
  options?: Record<string, unknown>,
) => {
  const axios = getAxiosInstance(token)
  return await axios.post(path, data, { headers, ...options})
}

export const performPutRequest = async (
  path: string,
  data?: object | null,
  token?: string | null,
  headers?: AxiosHeaders,
  options?: Record<string, unknown>,
) => {
  const axios = getAxiosInstance(token)

  return await axios.put(path, data, { headers, ...options })
}

export const performPatchRequest = async (
  path: string,
  data?: object | null,
  token?: string | null,
  headers?: AxiosHeaders,
  options?: Record<string, unknown>,
) => {
  const axios = getAxiosInstance(token)

  return await axios.patch(path, data, { headers, ...options })
}

export const performNewPatchRequest = async (
  path: string,
  data?: object | null,
  token?: string | null,
  headers?: AxiosHeaders,
  options?: Record<string, unknown>,
) => {
  const axios = getNewAxiosInstance(token)

  return await axios.patch(path, data, { headers, ...options })
}

export const performDeleteRequest = async (
  path: string,
  params: object,
  token?: string | null,
  headers?: AxiosHeaders,
  options?: Record<string, unknown>,
) => {
  const axios = getAxiosInstance(token)

  return await axios.delete(path, { params, headers, ...options })
}
