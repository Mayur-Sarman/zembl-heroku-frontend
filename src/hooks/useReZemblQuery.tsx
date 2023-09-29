import { UseQueryOptions, useQuery } from 'react-query'
import { ReZemblData, ReZemblRequestPayload, getReZemblData } from '../api/reZembl'

export const useReZemblQuery = (
  quoteData: ReZemblRequestPayload,
  token: string,
  { onSuccess, onError }: UseQueryOptions<ReZemblData, unknown>,
) =>
  useQuery({
    queryKey: ['getReZembl', token, quoteData],
    queryFn: () => getReZemblData(quoteData, token),
    staleTime: Infinity,
    refetchInterval: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: true,
    onSuccess,
    onError,
  })
