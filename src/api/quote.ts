export interface QuoteResponseData {
  opportunityId?: string
  businessDetails?: BusinessDetail
  accountDetails?: AccountDetail
  connectionDetails?: ConnectionDetail
  categoryId?: string
  electricityQuote?: Quote
  gasQuote?: Quote
}

export interface BusinessDetail {
  accountId?: string
  legalName?: string
  abn?: string
  position?: string
}

export interface AccountDetail {
  contactId?: string
  title?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: Date
  email?: string
  mobile?: string
  altPhone?: string
}

export interface ConnectionDetail {
  siteId?: string
  street?: string
  city?: string
  state?: string
  postCode?: string
  unitNo?: string
  unitType?: string
}

export interface Quote {
  quoteId?: string
  comparisons?: QuoteComparison[]
}

export interface QuoteComparison {
  id?: string
  quoteId?: string
  retailerId?: string
  retailerName?: string
  productId?: string
  productName?: string
  annualSavingIncGST?: number
}
