import { SEARCH_ABN_ENDPOINT } from '../constants'
import { performGetRequest } from '../helpers'

export const getSearchABN = async (payload: ABNSearchRequestPayload, token: string) => {
  const response = await performGetRequest(SEARCH_ABN_ENDPOINT, payload, token)
  return response.data as ABNResponse
}

export interface ABNSearchRequestPayload {
  abn: string
  includeHistoricalDetails: string
}

export interface ABNResponse {
  ABRPayloadSearchResults: ABNSearchResults
}

interface ABNSearchResults {
  request: ABNSearchRequest
  response: ABNSearchResponse
}

interface ABNSearchRequest {
  identifierSearchRequest: ABNSearchRequestInfo
}

interface ABNSearchRequestInfo {
  authenticationGUID: string
  identifierType: string
  identifierValue: string
  history: string
}

interface ABNSearchResponse {
  usageStatement: string
  dateRegisterLastUpdated: string
  dateTimeRetrieved: string
  businessEntity202001: BusinessEntity
  exception: ABNException | null
}

interface BusinessEntity {
  recordLastUpdatedDate: string
  ABN: ABN
  entityStatus: EntityStatus
  ASICNumber: string | null
  entityType: EntityType
  goodsAndServicesTax: GoodsAndServicesTax | GoodsAndServicesTax[]
  mainName: BusinessName | BusinessName[] | null
  mainBusinessPhysicalAddress: MainBusinessPhysicalAddress | MainBusinessPhysicalAddress[]
  businessName: BusinessName | BusinessName[] | null
  legalName: BusinessName | BusinessName[] | null
}

interface ABN {
  identifierValue: string
  isCurrentIndicator: string
  replacedFrom: string
}

interface EntityStatus {
  entityStatusCode: string | string[]
  effectiveFrom: string | string[]
  effectiveTo: string | string[]
}

interface EntityType {
  entityTypeCode: string
  entityDescription: string
}

interface GoodsAndServicesTax {
  effectiveFrom: string
  effectiveTo: string
}

interface BusinessName {
  organisationName?: string
  effectiveFrom?: string
  givenName?: string
  familyName?: string
  otherGivenName?: string
  effectiveTo?: string
}

interface MainBusinessPhysicalAddress {
  stateCode: string
  postcode: string
  effectiveFrom: string
  effectiveTo: string
}

interface ABNException {
  exceptionDescription: string
  exceptionCode: string
}