import { performPostRequest } from '../helpers'
import { Preference } from './common'

export const postCreateAccount = async (data: Account, token: string) => {
  const response = await performPostRequest('/account', data, token)
  return response.data as AccountResponse
}

export interface AccountResponse {
  accountRelationId: string
  accountId: string
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
  siteRelationId?: string
  siteId?: string
  preferences?: AccountPreference
}

export interface AccountPreference extends Preference {
  greenOrCarbon: boolean
  fixedPrice: boolean
  australianOwned: boolean
  lowestPrice: boolean
  localCustomerPrice: boolean
  noPreferences: boolean
}
