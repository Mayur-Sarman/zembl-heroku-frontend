import axios, { Axios, AxiosHeaders } from 'axios'

import { REQUEST_BASE_URL, SESSION_TOKEN_KEY } from '../constants'

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

  return await axios.post(path, data, { headers, ...options,
    // onUploadProgress: (progressEvent) => {
    //   const { loaded, total } = progressEvent
    //   const totals: number | undefined = total
    //   if(totals != null) {
    //     const percentage: number = Math.floor((loaded * 100) / totals)
    //     console.log('uploaded loaded:', loaded, ', totals:', totals, ', time:', new Date().toISOString());
    //     console.log('percentage: ', percentage);
    //   }
    // },
    // onDownloadProgress: (progressEvent) => {
    //   const { loaded, total } = progressEvent
    //   const totals: number | undefined = total
    //   console.log(progressEvent)
    //   if(totals != null) {
    //     const percentCompleted: number = Math.floor(loaded / totals * 100)
    //     console.log('download loaded:', loaded, ', total:', total, ', time:', new Date().toISOString());
    //     console.log('completed: ', percentCompleted)
    //   }
      
    // }
  })
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
