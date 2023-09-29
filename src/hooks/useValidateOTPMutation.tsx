import { UseMutationOptions, useMutation } from 'react-query'
import { ValidateOTPResponse, postValidateOTP } from '../api/quote'

export const useValidateOTPMutation = (
  token: string,
  { onSuccess, onError, ...rest }: UseMutationOptions<ValidateOTPResponse, unknown, string>,
) =>
  useMutation({
    mutationFn: (data: string) => postValidateOTP(data, token),
    ...rest,
    retry: false,
    onSuccess,
    onError,
  })
