import axios, { Axios, AxiosError, AxiosHeaders } from 'axios'
import { isArray } from 'lodash'
import { CONFIG_ERROR, NO_RESPONSE_ERROR, REQUEST_BASE_URL } from '../constants'
// import store from '../redux'
// import { logout, setLoginErrorMessage } from '../redux/slices/auth'
interface ErrorInfo {
    statusCode: number|null,
    message: string,
    error: string
  }

export const getAxiosInstance = () => {
  const instance: Axios = axios.create({
    baseURL: REQUEST_BASE_URL,
    timeout: 60000,
    timeoutErrorMessage: 'Request Timeout',
    headers: {
      'Content-Type': 'application/json',
    },
  })

//   const reduxAuthState = store.getState().auth

//   instance.interceptors.request.use(
//     (config) => ({
//       ...config,
//       headers: {
//         ...config.headers,
//         Authorization: `Bearer ${reduxAuthState.accessToken ?? reduxAuthState.tempAuthToken}`,
//       },
//     }),
//     (error) => Promise.reject(error),
//   )

//   instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const errorResponse = error.response;
//       if (error.response?.status === 401 && error.config?.url !== '/login') {
//         store.dispatch(logout())
//         store.dispatch(
//           setLoginErrorMessage({
//             errorMessage: 'Session expired, please login again.',
//           }),
//         )
//       }
//       return Promise.reject(error)
//     },
//   )

  return instance
}

export const performGetRequest = async (path: string, params: object, headers: AxiosHeaders) => {
  const axios = getAxiosInstance()

  return await axios.get(path, { params, headers })
}

export const performPostRequest = async (path: string, data: object, headers: AxiosHeaders) => {
  const axios = getAxiosInstance()

  return await axios.post(path, data, { headers })
}

export const performPutRequest = async (path: string, data: object, headers: AxiosHeaders) => {
  const axios = getAxiosInstance()

  return await axios.put(path, data, { headers })
}

export const performPatchRequest = async (path: string, data: object, headers: AxiosHeaders) => {
  const axios = getAxiosInstance()

  return await axios.patch(path, data, { headers })
}

export const performDeleteRequest = async (path: string, params: object, headers: AxiosHeaders) => {
  const axios = getAxiosInstance()

  return await axios.delete(path, { params, headers })
}

// export const extractPagination = (responseHeader: AxiosResponseHeaders) => {
//   return {
//     page: +responseHeader['current-page'],
//     itemCount: +responseHeader['item-count'],
//     total: +responseHeader['total-items'],
//     totalPages: +responseHeader['total-pages'],
//   }
// }

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
    console.error('Request error before request:', error.message)

    return buildAPIError(CONFIG_ERROR, errorMessage)
  }
  // console.log(error.config)
}
