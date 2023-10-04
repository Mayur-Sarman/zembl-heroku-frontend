import { UseQueryOptions, useQuery } from 'react-query'
import { ValidateTokenResponse, postValidateToken } from '../api/quote'
import { AxiosError } from 'axios'

export const useValidateTokenQuery = (
  token: string,
  { onSuccess, onError }: UseQueryOptions<ValidateTokenResponse, AxiosError>,
) =>
  useQuery({
    queryKey: ['validateToken', token],
    queryFn: () => postValidateToken(token),
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
