import { UseMutationOptions, useMutation } from 'react-query'
import { ErrorLog, SimpleResponse, saveLog } from '../api/common'
import { AxiosError } from 'axios'

export const useCreateLogDataMutation = (
  token: string,
  mutationConfigs?: UseMutationOptions<SimpleResponse, AxiosError, ErrorLog>,
) =>
  useMutation({
    mutationFn: (data: ErrorLog) => saveLog(data, token ?? ''),
    ...mutationConfigs,
  })
