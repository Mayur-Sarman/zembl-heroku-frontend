import { UseQueryOptions, useQuery } from 'react-query'
import { ProcessQuoteOutput, getFetchQuotePlanData } from '../api/quote'

export const useFetchQuoteDataQuery = (
  { token, quoteToken }: FetchQuoteDataQueryPayload,
  { onSuccess, onError }: UseQueryOptions<ProcessQuoteOutput, unknown>,
) =>
  useQuery({
    queryKey: ['fetchQuoteData', token, quoteToken],
    queryFn: () => getFetchQuotePlanData(quoteToken, token),
    staleTime: Infinity,
    refetchInterval: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    retryOnMount: false,
    retryDelay: Infinity,
    enabled: true,
    onSuccess,
    onError,
  })

interface FetchQuoteDataQueryPayload {
  token: string
  quoteToken: string
}
