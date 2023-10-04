import {
  ADD_ADDITIONAL_PROFILE_DETAIL_ENDPOINT,
  RegistrationData,
  UPDATE_MAIN_PROFILE_ENDPOINT,
  YES_VALUE,
} from '../constants'
import { performPatchRequest, performPostRequest } from '../helpers'
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

export const postCreateRetailerAdditionalDetail = async (data: RetailerAdditionalDetail, token: string) => {
  const response = await performPostRequest(ADD_ADDITIONAL_PROFILE_DETAIL_ENDPOINT, data, token)
  return response.data as RetailerAdditionalDetailResponse
}

export const buildRetailerAdditionalDetailPayload = (data: Record<string, unknown>) => {
  const concessionInput = data?.concession as Record<string, string>
  const isConcessionHolder = concessionInput?.concessionCardHolder === YES_VALUE
  const isConcessionConsent = concessionInput?.concessionConsent === YES_VALUE
  const concession: Concession = {
    ...concessionInput,
    concessionHolder: concessionInput?.concessionCardHolder ?? '',
    concessionCardStartDate: getJSONDateString(concessionInput?.concessionCardStartDate),
    concessionCardEndDate: getJSONDateString(concessionInput?.concessionCardEndDate),
  }

  const secondaryContactInput = data?.secondaryContact as Record<string, string>
  const shouldAddSecondaryContact = secondaryContactInput?.hasSecondaryContact === YES_VALUE
  const secondaryContact = {
    ...secondaryContactInput,
    dateOfBirth: getJSONDateString(secondaryContactInput?.dateOfBirth),
    type: data?.registrationType as string,
    accountId: (data?.accountDetails as AccountDetail)?.accountId,
  }

  const newConnectionInput = data?.newConnection as Record<string, string>
  const newConnection = { ...newConnectionInput }

  const buildedData: RetailerAdditionalDetail = {
    concession: !isConcessionHolder || !isConcessionConsent ? null : concession,
    secondaryContact: !shouldAddSecondaryContact ? null : secondaryContact,
    newConnection,
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

export interface RetailerAdditionalDetailResponse {
  contactId: string
}

export interface RetailerAdditionalDetail {
  concession?: Concession | null
  secondaryContact?: SecondaryContact | null
  newConnection?: NewConnection | null
}

interface Concession {
  concessionHolder: string
  concessionCardType?: string //Concession Type Values
  concessionCardNumber?: string
  concessionCardStartDate?: string | null
  concessionCardEndDate?: string | null
  onlyStateRebateResidence?: string //Unknow SF mapping
  currentlyReceiveRebate?: string //Unknow SF mapping
}

interface SecondaryContact {
  title?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string | null
  email?: string
  mobile?: string
  altPhone?: string
  type?: string
  accountId?: string
}

interface NewConnection {
  powerConnected?: string
  anyWorkCompletedSinceDisconnected?: string //Unknow SF mapping
  inspectionTimeslot?: string // '8AM - 1PM' | '1PM - 6PM'
  propertyAccessMethod?: string //'I will be home or Keys will be in the letter box' | 'Someone over the age of 18 will be at the property'
  sitePowerAware?: string // 'On' | 'Off' | 'Unsure'
  hasWorkAtPremises?: string
  siteGasConnected?: string //'On' | 'Off' | 'Unsure'
  anyElectricalOrRenovationWork?: string
  onGoingWorkDescription?: string
}
