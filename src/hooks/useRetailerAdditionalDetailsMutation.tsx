import { UseMutationOptions, useMutation } from 'react-query'
import {
  RetailerAdditionalDetail,
  RetailerAdditionalDetailResponse,
  postCreateRetailerAdditionalDetail,
} from '../api/profile'

export const useRetailerAdditionalDetailsMutation = (
  token: string,
  {
    onSuccess,
    onError,
    ...rest
  }: UseMutationOptions<RetailerAdditionalDetailResponse, unknown, RetailerAdditionalDetail>,
) =>
  useMutation({
    mutationFn: (reZemblConsentData: RetailerAdditionalDetail) =>
      postCreateRetailerAdditionalDetail(reZemblConsentData, token),
      ...rest,
      retry: false,
      onSuccess,
      onError,
  })
