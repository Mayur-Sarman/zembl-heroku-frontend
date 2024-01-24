import { getNames } from 'country-list'
import { Lead } from '../api/lead'
import { ProcessSiteOutput, Site } from '../api/site'
import { Account } from '../api/account'
import { ProcessQuoteOutput } from '../api/quote'

export const ELECTRICITY_VALUE = 'Electricity'
export const GAS_VALUE = 'Gas'
export const BOTH_VALUE = 'Both'

export const YES_VALUE = 'Yes'
export const YES_UNSURE = 'Yes / Unsure'

export const NO_VALUE = 'No'
export const NO_TRANSFER_NEW = 'No Transfer New'
export const NO_RENEW = 'No Renew'

export const CONNECTED = 'Connected'
export const DISCONNECTED = 'Disconnected'

export const ON_VALUE = 'On'
export const OFF_VALUE = 'Off'
export const UNSURE_VALUE = 'Unsure'

export const MISS_VALUE = 'Miss.'
export const MS_VALUE = 'Ms.'
export const MR_VALUE = 'Mr.'
export const MRS_VALUE = 'Mrs.'
export const DR_VALUE = 'Dr.'
export const PROF_VALUE = 'Prof.'
export const MX_VALUE = 'Mx.'

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

export const ZEMBL_ASSIST_VALUE = 'Talk to expert'
export const SELF_SERVE_VALUE = 'Compare online'

export const LOW_VALUE = 'Low'
export const MEDIUM_VALUE = 'Medium'
export const HIGH_VALUE = 'High'

export const UPLOAD_PDF_BILL = 'Upload PDF Bill'
export const HAVE_PAPER_BILL = 'Have paper bill'
export const UPLOAD_ELECTRICITY_BILL = 'Upload PDF electricity bill'
export const UPLOAD_GAS_BILL = 'Upload PDF gas bill'

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

export const ACTEW_AGL = 'Actew AGL'
export const ACTEW = 'Actew'
export const AGL = 'AGL'
export const ALINTA = 'Alinta'
export const BLUE_NRG = 'Blue NRG'
export const COVA_U = 'CovaU'
export const ENERGY_AU = 'Energy Australia'
export const ENERGY_LOCALS = 'Energy Locals'
export const ENGIE = 'ENGIE'
export const FLOW_POWER = 'Flow Power'
export const LUMO = 'Lumo'
export const MOMENTUM = 'Momentum'
export const MOMENTUM_ENERGY = 'Momentum Energy'
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

export const HCC = `HCC - Centrelink Healthcare Card`
export const PCC = `PCC - Centrelink Pensioner Concession Card`
export const DVPC = `DVPC - Dept of Veterans' Affairs Pensioner Concession Card`
export const DVAGC = `DVAGC - Dept of Veterans' Affairs Gold Card`
export const DVAGC_WW = `DVAGC_WW - Dept of Veterans' Affairs Gold Card War Widow`
export const DVAGC_TPI = `DVAGC_TPI - Dept of Veterans' Affairs Gold Card TPI`
export const QGSC = `QGSC - Queensland Government Seniors Card`
export const CSHC = `CSHC - Commonwealth Senior Health Card`
export const DVAGC_EDA = `DVAGC_EDA - DVA Gold Card (Disability pension only)`
export const SAHCC = `SAHCC - Health Care Card Sickness Allowance [SA]`
export const SPHCC = `SPHCC - Health Care Card Special Benefit [SP]`
export const CDHCC = `CDHCC - Health Care Card Carer (Child Under 16) [CD]`
export const NOCARD = `NOCARD - No Card (Used for One-Off Rebates)`
export const NOCARD_LS = `NOCARD_LS - No Card with Life Support`
export const ASYLUM_SEEKER = `Asylum seeker status (ImmiCard)`

export const HEALTH_CARE_CARD = 'Health Care Card'
export const PENSIONER_CARD = 'Pensioner Card'
export const GOLD_WAR_WIDOW_WW = 'Gold War Widow (WW)'
export const GOLD_TOTALLY_PERMANENTLY_INCAPACITATED_TPI = 'Gold Totally & Permanently Incapacitated (TPI)'
export const QLD_GOVERNMENT_SENIORS_CARD = 'QLD Government Seniors Card'
export const AUSTRALIAN_GOVERNMENT_IMMI_CARD_ASYLUM_SEEKER = 'Australian Government ImmiCard (Asylum Seeker)'
export const GOLD_EXTREME_DISABLEMENT_ADJUSTMENT_EDA = 'Gold Extreme Disablement Adjustment (EDA)'

export const GREEN_POWER_10_PERCENT = `10%`
export const GREEN_POWER_25_PERCENT = `25%`
export const GREEN_POWER_100_PERCENT = `100%`

export const INSTALLATION_TIME_MORNING = '8am - 1pm'
export const INSTALLATION_TIME_AFTERNOON = '1pm - 6pm'

export const BE_HOME = 'I will be home'
export const PROVIDE_KEYS = 'Keys will be in the letter box'

export const INSPECTION_METHOD_PERSON = 'Someone over the age of 18 will be at the property'
export const INSPECTION_METHOD_KEYS_MAIL = 'Leave the keys in the mail box'
export const INSPECTION_METHOD_KEYS_METER = 'Leave the keys in the meter box'

export const OXYGEN_CONCENTRATOR = 'Oxygen concentrator'
export const INTERMITTENT_PERITONEAL_DIALYSIS_MACHINES = 'Intermittent peritoneal dialysis machines'
export const KIDNEY_DIALYSIS_MACHINE = 'Kidney dialysis machine'
export const CHRONIC_POSITIVE_AIRWAYS_PRESSURE_RESPIRATORS_CPAP = 'Chronic positive airways pressure respirators (CPAP)'
export const CRIGLER_NAJJAR_SYNDROME_PHOTOTHERAPY_EQUIPMENT = 'Crigler najjar syndrome phototherapy equipment'
export const VENTILATORS_FOR_LIFE_SUPPORT = 'Ventilators for life support'

export const SIMPLY_ENERGY_OPTIONS_ONE = 'You can change the method you receive your bills anytime by contacting customer service.'
export const SIMPLY_ENERGY_OPTIONS_TWO = 'By receiving your bills via post you will be charged a fee of $1.65 including GST. You can change the method you receive your bills anytime by contacting customer service.'

export const INSPECTION_METHOD_OPTIONS = [
  { value: INSPECTION_METHOD_PERSON, label: INSPECTION_METHOD_PERSON },
  { value: INSPECTION_METHOD_KEYS_MAIL, label: INSPECTION_METHOD_KEYS_MAIL },
  { value: INSPECTION_METHOD_KEYS_METER, label: INSPECTION_METHOD_KEYS_METER },
]

export const SIMPLY_ENERGY_OPTIONS = [
  { value: SIMPLY_ENERGY_OPTIONS_ONE, label: SIMPLY_ENERGY_OPTIONS_ONE },
  { value: SIMPLY_ENERGY_OPTIONS_TWO, label: SIMPLY_ENERGY_OPTIONS_TWO },
]

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

export const YES_UNSURE_OPTIONS = [
  { value: YES_UNSURE, label: YES_UNSURE },
  { value: NO_VALUE, label: NO_VALUE },
]

export const HAS_CONNECTION_OPTIONS = [
  { value: CONNECTED, label: CONNECTED },
  { value: DISCONNECTED, label: DISCONNECTED },
]

export const HOME_OR_PROVIDE_KEYS_OPTIONS = [
  { value: BE_HOME, label: BE_HOME },
  { value: PROVIDE_KEYS, label: PROVIDE_KEYS },
]

export const INSTALLLATION_TIMESLOT_OPTIONS = [
  { value: INSTALLATION_TIME_MORNING, label: INSTALLATION_TIME_MORNING },
  { value: INSTALLATION_TIME_AFTERNOON, label: INSTALLATION_TIME_AFTERNOON },
]

export const PERFERENCES_OPTIONS: SelectOption[] = [
  { value: GREEN_OR_CARBON_NEUTRAL, label: GREEN_OR_CARBON_NEUTRAL },
  { value: AUSTRALIAN_OWNED, label: AUSTRALIAN_OWNED },
  { value: LOCAL_CUSTOMER_SERVICE, label: LOCAL_CUSTOMER_SERVICE },
  { value: LOWEST_PRICE, label: LOWEST_PRICE },
  { value: FIXED_PRICE, label: FIXED_PRICE },
  { value: NO_PREFERENCE, label: NO_PREFERENCE },
]

export const TITLE_LIST_OPTIONS = [MISS_VALUE, MS_VALUE, MR_VALUE, PROF_VALUE, MRS_VALUE, DR_VALUE, MX_VALUE].map(
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
  { value: UPLOAD_ELECTRICITY_BILL, label: UPLOAD_ELECTRICITY_BILL },
  { value: UPLOAD_GAS_BILL, label: UPLOAD_GAS_BILL },
  { value: HAVE_PAPER_BILL, label: HAVE_PAPER_BILL },
]

export const MEDICARE_REF_NO_OPTIONS: SelectOption[] = ['1', '2', '3', '4'].map((item) => ({
  value: item,
  label: item,
}))

export const RETAILER_OPTIONS: SelectOption[] = [
  ACTEW_AGL,
  AGL,
  ALINTA,
  BLUE_NRG,
  COVA_U,
  ENERGY_AU,
  ENERGY_LOCALS,
  ENGIE,
  FLOW_POWER,
  LUMO,
  MOMENTUM,
  NECTR,
  NEXT_BUSINESS_ENERGY,
  ORIGIN,
  POWERSHOP,
  RED_ENERGY,
  SHELL,
  SIMPLY_ENERGY,
  SMARTEST_ENERGY,
  SUMO,
  TANGO,
  OTHER,
].map((i) => ({ value: i, label: i }))

export const PREF_RETAILERS: string[] = [
  AGL,
  ENERGY_LOCALS,
  MOMENTUM_ENERGY,
  SIMPLY_ENERGY,
]

export const AGL_CONCESSION_CARD_TYPES = [
  // HEALTH_CARE_CARD,
  // PENSIONER_CARD,
  // GOLD_WAR_WIDOW_WW,
  // GOLD_TOTALLY_PERMANENTLY_INCAPACITATED_TPI,
  // QLD_GOVERNMENT_SENIORS_CARD,
  // AUSTRALIAN_GOVERNMENT_IMMI_CARD_ASYLUM_SEEKER,
  // GOLD_EXTREME_DISABLEMENT_ADJUSTMENT_EDA,
  HCC,
  PCC,
  DVPC,
  DVAGC,
  DVAGC_WW,
  DVAGC_TPI,
  QGSC,
  CSHC,
  DVAGC_EDA,
  SAHCC,
  SPHCC,
  CDHCC,
  NOCARD,
  NOCARD_LS,
  ASYLUM_SEEKER,
].map((item) => ({ value: item, label: item }))

export const LIFE_SUPPORT_EQUIPMENT_OPTIONS = [
  OXYGEN_CONCENTRATOR,
  INTERMITTENT_PERITONEAL_DIALYSIS_MACHINES,
  KIDNEY_DIALYSIS_MACHINE,
  CHRONIC_POSITIVE_AIRWAYS_PRESSURE_RESPIRATORS_CPAP,
  CRIGLER_NAJJAR_SYNDROME_PHOTOTHERAPY_EQUIPMENT,
  VENTILATORS_FOR_LIFE_SUPPORT,
  OTHER
].map((item) => ({ value: item, label: item }))

export const GREEN_POWER_OPTIONS = [
  GREEN_POWER_10_PERCENT,
  GREEN_POWER_25_PERCENT,
  GREEN_POWER_100_PERCENT,
  NO_VALUE,
].map((item) => ({ value: item, label: item }))

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
export const COUNTRY_LIST_OPTIONS: SelectOption[] = getNames().map((item) => ({ label: item, value: item }))

export interface SelectOption {
  value: string
  label: string
}

export interface RegistrationData
  extends Lead,
    Site,
    ProcessSiteOutput,
    Account,
    ProcessQuoteOutput,
    Record<string, unknown> {
  leadId?: string | null
  energyType?: string
  registrationType?: string
  businessRegisType?: string
  gasBillInfo?: BillInfo
  electricityBillInfo?: BillInfo
  accountName?: string | null | undefined
  accountType?: string
  nextPageDisabled?: boolean
  fullAddress?: string
}

interface BillInfo {
  billFiles?: FileList
  currentRetailer?: string
  currentUsage?: string
}
