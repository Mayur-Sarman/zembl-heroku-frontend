import { UseMutationOptions, useMutation } from 'react-query'
import { SimpleResponse } from '../api/common'
import { UpdateReZemblTermsConsentPayload, patchConsentReZemblTerms } from '../api/reZembl'
import { AxiosError } from 'axios'

export const useReZemblTermsMutation = (
  token: string,
  { onSuccess, onError, ...rest }: UseMutationOptions<SimpleResponse, AxiosError, UpdateReZemblTermsConsentPayload>,
) =>
  useMutation({
    mutationFn: (reZemblConsentData: UpdateReZemblTermsConsentPayload) =>
      patchConsentReZemblTerms(reZemblConsentData, token),
    ...rest,
    retry: false,
    onSuccess,
    onError,
  })
