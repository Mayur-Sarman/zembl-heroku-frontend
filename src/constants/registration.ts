import { getNames } from 'country-list'

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
export const PERIOD_SPEND_MORE = 'More'
export const PERIOD_SPEND_LESS = 'Less'

export const EMAIL_VALUE = 'Email'
export const POST_VALUE = 'Post'

export const LOW_VALUE = 'Low'
export const MEDIUM_VALUE = 'Medium'
export const HIGH_VALUE = 'High'

export const UPLOAD_PDF_BILL = 'Upload PDF Bill'
export const HAVE_PAPER_BILL = 'Have Paper Bill'
export const UPLOAD_ELECTRICITY_BILL = 'Upload Electricity Bill'
export const UPLOAD_GAS_BILL = 'Upload Gas Bill'

export const YES_NO_OPTIONS = [
  { value: YES_VALUE, label: YES_VALUE },
  { value: NO_VALUE, label: NO_VALUE },
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
  { value: UPLOAD_PDF_BILL, label: UPLOAD_PDF_BILL },
  { value: HAVE_PAPER_BILL, label: HAVE_PAPER_BILL },
  { value: UPLOAD_ELECTRICITY_BILL, label: UPLOAD_ELECTRICITY_BILL },
  { value: UPLOAD_GAS_BILL, label: UPLOAD_GAS_BILL },
]

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
export const COUNTRY_LIST_OPTIONS: SelectOption[] = getNames().map((item) => ({ label: item, value: item }))

export interface SelectOption {
  value: string
  label: string
}
