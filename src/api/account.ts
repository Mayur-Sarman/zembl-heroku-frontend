import { CREATE_ACCOUNT_ENDPOINT, RegistrationData } from '../constants'
import { performPostRequest } from '../helpers'
import { getPhoneNumber } from '../helpers/formatter'
import { Preference } from './common'
import { QuoteResponse } from './quote'

export const postCreateAccount = async (data: Account, token: string) => {
  const response = await performPostRequest(CREATE_ACCOUNT_ENDPOINT, data, token)
  return response.data as QuoteResponse
}

export const buildCreateAccountPayload = (data: RegistrationData, nmi?: string, mirn?: string) => {
  const {
    abn,
    registrationType,
    phone,
    address,
    fullAddress,
    firstName,
    lastName,
    email,
    gas,
    electricity,
    siteRelationshipId,
    siteId,
    preferences,
    accountName,
    currentRetailerElectric,
    currentRetailerGas,
    currentUsageElectric,
    currentUsageGas,
  } = data

  const buildedData = {
    abn,
    mirn,
    nmi,
    address,
    name: accountName,
    legalName: accountName,
    fullAddress,
    accountType: registrationType,
    phone: getPhoneNumber(phone),
    mobile: getPhoneNumber(phone),
    firstName,
    lastName,
    email: email,
    gas,
    electricity,
    siteRelationshipId,
    siteId,
    preferences,
    currentRetailerElectric,
    currentRetailerGas,
    currentUsageElectric,
    currentUsageGas,
  }

  return buildedData
}

export interface Account {
  abn?: string
  mirn?: string
  nmi?: string
  accountType?: string
  phone?: string
  mobile?: string
  firstName?: string
  lastName?: string
  electricity?: boolean
  gas?: boolean
  email?: string
  siteRelationshipId?: string
  siteId?: string
  preferences?: Preference
}
