import { RegistrationData, UPDATE_MAIN_PROFILE_ENDPOINT } from '../constants'
import { performPatchRequest } from '../helpers'
import { getJSONDateString, getPhoneNumber } from '../helpers/formatter'
import { GoogleMapExtractedComponents } from '../helpers/googleMap'
import { AccountDetail, BusinessDetail } from './quote'

export const patchUpdateProfile = async (data: MainProfile, token: string) => {
  const response = await performPatchRequest(UPDATE_MAIN_PROFILE_ENDPOINT, data, token)
  return response.data as UpdateProfileResponse
}

export const buildMainProfilePayload = (data: RegistrationData) => {
  const address: GoogleMapExtractedComponents = data.address as GoogleMapExtractedComponents
  const buildedAddress: ConnectionDetail = {
    ...(data.address as GoogleMapExtractedComponents),
    siteId: data.siteId,
    unitNo: address?.unitNumber ?? '',
    street: `${address.street ?? ''} ${address.route ?? ''}`,
    city: address?.suburb,
  }

  const proofOfIdentity = data.proofOfIdentity as ProofOfIdentity
  const accountDetails = data.accountDetails
  const buildedData: MainProfile = {
    opportunityId: data.opportunityId,
    accountDetails: {
      ...accountDetails,
      dateOfBirth: getJSONDateString((data?.dateOfBirth as string) ?? '') ?? '',
      phone: getPhoneNumber(data.phone),
      mobile: getPhoneNumber(data.phone),
      altPhone: getPhoneNumber(data.altPhone as string),
      title: data.title as string,
    },
    proofOfIdentity: {
      ...proofOfIdentity,
      expiryDate: getJSONDateString(proofOfIdentity?.expiryDate ?? ''),
      type: data?.identificationType as string,
    },
    connectionDetails: buildedAddress,
  }
  return buildedData
}

export interface MainProfile {
  opportunityId?: string // '0060T0000060TF8QAM'
  accountDetails?: AccountDetail

  businessDetails?: BusinessDetail
  connectionDetails?: ConnectionDetail
  proofOfIdentity?: ProofOfIdentity
}

export interface ProofOfIdentity {
  type?: string // 'foreign_passport'
  expiryDate?: string | null // '2023-09-22T07:15:26.044Z'
  licenceNo?: string // "string",
  licenceCardNo?: string // "string",
  licenceState?: string // "string",
  passportNo?: string // '12521515'
  medicareCardNo?: string // "string",
  referenceNo?: string // "string",
  cardColour?: string // "string",
  middleName?: string // "string",
  country?: string // 'Thailand'
}

export interface ConnectionDetail {
  siteId?: string | null // 'a040T000006s1CtQAI'
  street?: string | null // 'string'
  city?: string | null // 'string'
  state?: string | null // 'string'
  postCode?: string | null // 'string'
  unitNo?: string | null // 'string'
  unitType?: string | null // 'string'
}

export interface UpdateProfileResponse {
  message: string
}
