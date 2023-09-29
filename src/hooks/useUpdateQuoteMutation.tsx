import { UseMutationOptions, useMutation } from 'react-query'
import { ProcessQuoteOutput, patchUpdateQuotePlan } from '../api/quote'
import { SimpleResponse } from '../api/common'

export const useUpdateQuoteMutation = ({
  onSuccess,
  onError,
  ...rest
}: UseMutationOptions<SimpleResponse, unknown, UpdateQuoteRequest>) =>
  useMutation({
    mutationFn: ({ planData, token }: UpdateQuoteRequest) => patchUpdateQuotePlan(planData, token),
    ...rest,
    retry: false,
    onSuccess,
    onError,
  })

interface UpdateQuoteRequest {
  planData: ProcessQuoteOutput
  token: string
}
