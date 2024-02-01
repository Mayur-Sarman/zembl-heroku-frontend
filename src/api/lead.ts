import {
  BOTH_VALUE,
  CAndI_VALUE,
  CREATE_LEAD_ENDPOINT,
  ELECTRICITY_VALUE,
  GAS_VALUE,
  MONTHLY_SPEND_MORE,
  QUARTERLY_SPEND_MORE,
  REGISTRATION_TYPE_BUSINESS,
  RESIDENTIAL_VALUE,
  RegistrationData,
  SME_VALUE,
  UPDATE_LEAD_ENDPOINT,
  YES_VALUE,
} from '../constants'
import { performPatchRequest, performPostRequest } from '../helpers'
import { getJSONDateString } from '../helpers/formatter'
import { GoogleMapExtractedComponents } from '../helpers/googleMap'

export const postCreateLead = async (data: Lead) => {
  const response = await performPostRequest(CREATE_LEAD_ENDPOINT, data)
  return response.data as LeadResponse
}

export const patchUpdateLead = async (data: Lead, token: string) => {
  const response = await performPatchRequest(UPDATE_LEAD_ENDPOINT, data, token)
  return response.data as LeadResponse
}

export const buildLeadPayload = (data: RegistrationData) => {
  const isBusiness = data?.registrationType === REGISTRATION_TYPE_BUSINESS
  const isCI =
    data.moreThanOne === YES_VALUE || [MONTHLY_SPEND_MORE, QUARTERLY_SPEND_MORE].includes(data?.billEnergySpend ?? '')

  let recordType = SME_VALUE
  if (!isBusiness) {
    recordType = RESIDENTIAL_VALUE
  } else if (isCI) {
    recordType = CAndI_VALUE
  }
  const address = data?.address as GoogleMapExtractedComponents
  
  const buildedData = {
    ...data,
    electricity: [ELECTRICITY_VALUE, BOTH_VALUE].includes(data?.energyType ?? ''),
    gas: [GAS_VALUE, BOTH_VALUE].includes(data?.energyType ?? ''),
    recordType,
    id: data?.leadId ?? '',
    moveInDate: getJSONDateString(data?.moveInDate),
    newConnection: data?.isMoving === YES_VALUE,
    fullAddress: (data?.address as GoogleMapExtractedComponents).fullAddress,
    // fullAddress: '157 Para Road, Greensborough VIC, Australia',
    address: {
      country: address?.country,
      fullAddress: address?.fullAddress,
      postCode: address?.postCode,
      street: address?.street,
      fullStreet: ((address?.unitType ?? '').toUpperCase() + ' ' + (address?.unitNumber ?? '').toUpperCase() + ' ' + (address?.street ?? '') + ' ' + (address?.route ?? '')).trim(),
      route: address?.route,
      state: address?.state,
      city: address?.suburb,
      unitNumber: address?.unitNumber,
      unitType: address?.unitType,
    }
  }

  return buildedData
}

export interface LeadResponse {
  accessToken?: string
  processLeadOutput?: Partial<Lead>
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
