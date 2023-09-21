import { performPostRequest } from '../helpers'
import { Preference } from './common'

export const postCreateSite = async (data: Site, token: string) => {
  const response = await performPostRequest('/site', data, token)
  return response.data as SiteResponse
}

export interface SiteResponse {
  siteRelationId: string
  siteId: string
}

export interface Site {
  street?: string | null
  city?: string | null
  state?: string | null
  postCode?: string | null
  gas?: boolean
  electricity?: boolean
  siteType?: string | null
  leadId?: string | null
  billType?: string | null
  lifeSupport?: string | null
  solar?: string | null
  solarConsideration?: string | null
  preferences?: SitePreference | null
}

export interface SitePreference extends Preference {
  greenOrCarbon: boolean
  fixedPrice: boolean
  australianOwned: boolean
  lowestPrice: boolean
  localCustomerService: boolean
  noPreferences: boolean
}
