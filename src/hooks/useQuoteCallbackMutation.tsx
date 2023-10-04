import { UseMutationOptions, useMutation } from 'react-query'
import { SimpleResponse } from '../api/common'
import { CallbackRequestPayload, patchQuoteCallback } from '../api/quote'
import { AxiosError } from 'axios'

export const useQuoteCallbackMutation = (
  token: string,
  { onSuccess, onError, ...rest }: UseMutationOptions<SimpleResponse, AxiosError, CallbackRequestPayload>,
) =>
  useMutation({
    mutationFn: (data: CallbackRequestPayload) => patchQuoteCallback(data, token),
    ...rest,
    retry: false,
    onSuccess,
    onError,
  })
