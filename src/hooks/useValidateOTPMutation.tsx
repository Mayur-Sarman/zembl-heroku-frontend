import { UseMutationOptions, useMutation } from 'react-query'
import { ValidateOTPResponse, postValidateOTP } from '../api/quote'
import { AxiosError } from 'axios'

export const useValidateOTPMutation = (
  token: string,
  { onSuccess, onError, ...rest }: UseMutationOptions<ValidateOTPResponse, AxiosError, string>,
) =>
  useMutation({
    mutationFn: (data: string) => postValidateOTP(data, token),
    ...rest,
    retry: false,
    onSuccess,
    onError,
  })
