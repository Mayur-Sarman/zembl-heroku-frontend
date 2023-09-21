import { getNames } from 'country-list'
import { Lead } from '../api/lead'
import { Site, SiteResponse } from '../api/site'

export const ELECTRICITY_VALUE = 'Electricity'
export const GAS_VALUE = 'Gas'
export const BOTH_VALUE = 'Both'

export const YES_VALUE = 'Yes'
export const NO_VALUE = 'No'

export const MISS_VALUE = 'Miss'
export const MS_VALUE = 'Ms'
export const MR_VALUE = 'Mr'
export const SIR_VALUE = 'Sir'
export const MRS_VALUE = 'Mrs'
export const DR_VALUE = 'Dr'
export const MX_VALUE = 'Mx'

export const NSW_VALUE = { fullName: 'New South Wales', shortName: 'NSW' }
export const QLD_VALUE = { fullName: 'Queensland', shortName: 'QLD' }
export const SA_VALUE = { fullName: 'South Australia', shortName: 'SA' }
export const TAS_VALUE = { fullName: 'Tasmania', shortName: 'TAS' }
export const VIC_VALUE = { fullName: 'Victoria', shortName: 'VIC' }
export const WA_VALUE = { fullName: 'Western Australia', shortName: 'WA' }
export const ACT_VALUE = { fullName: 'Australian Capital Territory', shortName: 'ACT' }
export const NT_VALUE = { fullName: 'Northern Territory', shortName: 'NT' }

export const DRIVER_LICENSE_VALUE = 'Driver License'
export const AUSTRALIAN_PASSPORT_VALUE = 'Australian Passport'
export const MEDICARE_CARD_VALUE = 'Medicare Card'
export const FOREIGN_PASSPORT_VALUE = 'Foreign Passport'

export const MEDICARE_CARD_GREEN = 'Green'
export const MEDICARE_CARD_BLUE = 'Blue'
export const MEDICARE_CARD_YELLOW = 'Yellow'

export const BILLING_TYPE_MONTHLY = 'Monthly'
export const BILLING_TYPE_QUARTERLY = 'Quarterly'

export const MONTHLY_SPEND_MORE = '> 2,500'
export const MONTHLY_SPEND_LESS = '< 2,500'
export const QUARTERLY_SPEND_MORE = '> 7,500'
export const QUARTERLY_SPEND_LESS = '< 7,500'

export const EMAIL_VALUE = 'Email'
export const POST_VALUE = 'Post'

export const ZEMBL_ASSIST_VALUE = 'Zembl Assistance'
export const SELF_SERVE_VALUE = 'Self Serve'

export const LOW_VALUE = 'Low'
export const MEDIUM_VALUE = 'Medium'
export const HIGH_VALUE = 'High'

export const UPLOAD_PDF_BILL = 'Upload PDF Bill'
export const HAVE_PAPER_BILL = 'Have Paper Bill'
export const UPLOAD_ELECTRICITY_BILL = 'Upload Electricity Bill'
export const UPLOAD_GAS_BILL = 'Upload Gas Bill'

export const REGISTRATION_TYPE_BUSINESS = 'Business'
export const REGISTRATION_TYPE_RESIDENTIAL = 'Residential'

export const SME_VALUE = 'SME'
export const CAndI_VALUE = 'C_I'
export const RESIDENTIAL_VALUE = 'Residential'

export const LEAD_STATUS_CONVERTED_WON = 'Converted Won'

export const ABN_ACTIVE = 'Active'

export const GREEN_OR_CARBON_NEUTRAL = 'Green or Carbon Neutral'
export const AUSTRALIAN_OWNED = 'Australian Owned'
export const LOCAL_CUSTOMER_SERVICE = 'Local Customer Service'
export const LOWEST_PRICE = 'Lowest Price'
export const FIXED_PRICE = 'Fixed Price'
export const NO_PREFERENCE = 'No Preference'

export const ACTEW = 'Actew'
export const AGL = 'AGL'
export const ALINTA = 'Alinta'
export const BLUE_NRG = 'Blue NRG'
export const COVA_U = 'CovaU'
export const ENERGY_AUSTRALIA = 'Energy Australia'
export const ENERGY_LOCALS = 'Energy Locals'
export const ENGIE = 'ENGIE'
export const FLOW_POWER = 'Flow Power'
export const LUMO = 'Lumo'
export const MOMENTUM = 'Momentum'
export const NECTR = 'Nectr'
export const NEXT_BUSINESS_ENERGY = 'Next Business Energy'
export const ORIGIN = 'Origin'
export const OTHER = 'Other'
export const POWERSHOP = 'Powershop'
export const RED_ENERGY = 'Red Energy'
export const SHELL = 'Shell'
export const SIMPLY_ENERGY = 'Simply Energy'
export const SMARTEST_ENERGY = 'Smartest Energy'
export const SUMO = 'Sumo'
export const TANGO = 'Tango'

export const REGISTRATION_TYPE_OPTIONS = [
  { value: REGISTRATION_TYPE_BUSINESS, label: REGISTRATION_TYPE_BUSINESS },
  { value: REGISTRATION_TYPE_RESIDENTIAL, label: REGISTRATION_TYPE_RESIDENTIAL },
]

export const BILLING_TYPE_OPTIONS = [
  { value: BILLING_TYPE_MONTHLY, label: BILLING_TYPE_MONTHLY },
  { value: BILLING_TYPE_QUARTERLY, label: BILLING_TYPE_QUARTERLY },
]

export const BUSINESS_REGISTRATION_TYPE_OPTIONS = [
  { value: ZEMBL_ASSIST_VALUE, label: ZEMBL_ASSIST_VALUE },
  { value: SELF_SERVE_VALUE, label: SELF_SERVE_VALUE },
]

export const QUARTERLY_SPEND_OPTIONS = [
  { value: QUARTERLY_SPEND_LESS, label: 'Less than $7,500' },
  { value: QUARTERLY_SPEND_MORE, label: 'More than $7,500' },
]

export const MONTHLY_SPEND_OPTIONS = [
  { value: MONTHLY_SPEND_LESS, label: 'Less than $2,500' },
  { value: MONTHLY_SPEND_MORE, label: 'More than $2,500' },
]

export const YES_NO_OPTIONS = [
  { value: YES_VALUE, label: YES_VALUE },
  { value: NO_VALUE, label: NO_VALUE },
]

export const PERFERENCES_OPTIONS: SelectOption[] = [
  { value: GREEN_OR_CARBON_NEUTRAL, label: GREEN_OR_CARBON_NEUTRAL },
  { value: AUSTRALIAN_OWNED, label: AUSTRALIAN_OWNED },
  { value: LOCAL_CUSTOMER_SERVICE, label: LOCAL_CUSTOMER_SERVICE },
  { value: LOWEST_PRICE, label: LOWEST_PRICE },
  { value: FIXED_PRICE, label: FIXED_PRICE },
  { value: NO_PREFERENCE, label: NO_PREFERENCE },
]

export const TITLE_LIST_OPTIONS = [MISS_VALUE, MS_VALUE, MR_VALUE, SIR_VALUE, MRS_VALUE, DR_VALUE, MX_VALUE].map(
  (title) => ({
    label: title,
    value: title,
  }),
)

export const IDENTITY_TYPE_OPTIONS = [
  DRIVER_LICENSE_VALUE,
  AUSTRALIAN_PASSPORT_VALUE,
  MEDICARE_CARD_VALUE,
  FOREIGN_PASSPORT_VALUE,
].map((typeName) => ({
  label: typeName,
  value: typeName,
}))

export const STATE_LIST_OPTIONS = [
  NSW_VALUE,
  QLD_VALUE,
  SA_VALUE,
  TAS_VALUE,
  VIC_VALUE,
  WA_VALUE,
  ACT_VALUE,
  NT_VALUE,
].map((state) => ({ ...state, label: state.shortName, value: state.shortName }))

export const MEDICARE_COLOUR_LIST_OPTIONS = [MEDICARE_CARD_GREEN, MEDICARE_CARD_BLUE, MEDICARE_CARD_YELLOW].map(
  (color) => ({
    label: color,
    value: color,
  }),
)

export const ENERGY_TYPE_OPTIONS: SelectOption[] = [
  { value: ELECTRICITY_VALUE, label: ELECTRICITY_VALUE },
  { value: GAS_VALUE, label: GAS_VALUE },
  { value: BOTH_VALUE, label: 'Electricity & Gas' },
]

export const SUBSCRIBE_TYPE_OPTIONS: SelectOption[] = [
  { value: EMAIL_VALUE, label: EMAIL_VALUE },
  { value: POST_VALUE, label: POST_VALUE },
]

export const CURRENT_USAGE_OPTIONS: SelectOption[] = [
  { value: LOW_VALUE, label: LOW_VALUE },
  { value: MEDIUM_VALUE, label: MEDIUM_VALUE },
  { value: HIGH_VALUE, label: HIGH_VALUE },
]

export const UPLOAD_BILL_TYPE_OPTIONS: SelectOption[] = [
  { value: HAVE_PAPER_BILL, label: HAVE_PAPER_BILL },
  { value: UPLOAD_ELECTRICITY_BILL, label: UPLOAD_ELECTRICITY_BILL },
  { value: UPLOAD_GAS_BILL, label: UPLOAD_GAS_BILL },
]

export const MEDICARE_REF_NO_OPTIONS: SelectOption[] = ['1', '2', '3', '4'].map((item) => ({
  value: item,
  label: item,
}))

export const RETAILER_OPTIONS: SelectOption[] = [
  ACTEW,
  AGL,
  ALINTA,
  BLUE_NRG,
  COVA_U,
  ENERGY_AUSTRALIA,
  ENERGY_LOCALS,
  ENGIE,
  FLOW_POWER,
  LUMO,
  MOMENTUM,
  NECTR,
  NEXT_BUSINESS_ENERGY,
  ORIGIN,
  OTHER,
  POWERSHOP,
  RED_ENERGY,
  SHELL,
  SIMPLY_ENERGY,
  SMARTEST_ENERGY,
  SUMO,
  TANGO,
].map((i) => ({ value: i, label: i }))

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
export const COUNTRY_LIST_OPTIONS: SelectOption[] = getNames().map((item) => ({ label: item, value: item }))

export interface SelectOption {
  value: string
  label: string
}

export interface RegistrationData extends Lead, Site, SiteResponse, Record<string, unknown> {
  leadId?: string | null
  energyType?: string
  registrationType?: string
  businessRegisType?: string
  gasBillInfo?: BillInfo
  electricityBillInfo?: BillInfo
}

interface BillInfo {
  billFiles?: FileList
  currentRetailer?: string
  currentUsage?: string
}
