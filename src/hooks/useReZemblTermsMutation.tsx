import { UseMutationOptions, useMutation } from 'react-query'
import { SimpleResponse } from '../api/common'
import { UpdateReZemblTermsConsentPayload, patchConsentReZemblTerms } from '../api/reZembl'

export const useReZemblTermsMutation = (
  token: string,
  { onSuccess, onError, ...rest }: UseMutationOptions<SimpleResponse, unknown, UpdateReZemblTermsConsentPayload>,
) =>
  useMutation({
    mutationFn: (reZemblConsentData: UpdateReZemblTermsConsentPayload) =>
      patchConsentReZemblTerms(reZemblConsentData, token),
    ...rest,
    retry: false,
    onSuccess,
    onError,
  })
