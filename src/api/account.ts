import { RegistrationData } from '../constants'
import { performPostRequest } from '../helpers'
import { Preference } from './common'
import { QuoteResponse } from './quote'

export const postCreateAccount = async (data: Account, token: string) => {
  const response = await performPostRequest('/account', data, token)
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
    phone,
    firstName,
    lastName,
    email: email,
    gas,
    electricity,
    siteRelationshipId,
    siteId,
    preferences,
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
