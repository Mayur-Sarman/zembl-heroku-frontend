import { CREATE_LEAD_ENDPOINT, UPDATE_LEAD_ENDPOINT } from '../constants'
import { performPatchRequest, performPostRequest } from '../helpers'

export const postCreateLead = async (data: Lead, token: string) => {
  const response = await performPostRequest(CREATE_LEAD_ENDPOINT, data, token)
  return response.data as LeadResponse
}

export const patchUpdateLead = async (data: Lead, token: string) => {
  const response = await performPatchRequest(UPDATE_LEAD_ENDPOINT, data, token)
  return response.data as LeadResponse
}

export interface LeadResponse {
  accessToken?: string
  processLeadOutput?: Partial<Lead>
}

export interface Lead {
  id?: string
  firstName?: string
  lastName?: string
  phone?: string
  recordType?: string // 'SME' | "C&I"
  electricity?: boolean
  gas?: boolean
  newConnection?: boolean
  moveInDate?: string | null
  billFrequency?: string // 'Monthly' | 'Quarterly'
  billEnergySpend?: string // '< 2,500' | '> 2,500' | '< 7,500' | '> 7,500'
  abn?: string
  postCode?: string | null
  status?: string
}
