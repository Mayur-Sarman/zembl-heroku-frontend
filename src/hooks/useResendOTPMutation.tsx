import { UseMutationOptions, useMutation } from 'react-query'
import { postResendOTP } from '../api/quote'
import { SimpleResponse } from '../api/common'
import { AxiosError } from 'axios'

export const useResendOTPMutation = (
  token: string,
  { onSuccess, onError, ...rest }: UseMutationOptions<SimpleResponse, AxiosError, void>,
) =>
  useMutation({
    mutationFn: () => postResendOTP(token),
    ...rest,
    retry: false,
    onSuccess,
    onError,
  })
