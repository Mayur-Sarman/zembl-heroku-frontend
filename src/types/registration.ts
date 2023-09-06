import { BOTH_VALUE, ELECTRICITY_VALUE, GAS_VALUE } from '../constants'

export type EnergyType = GAS_VALUE | ELECTRICITY_VALUE | BOTH_VALUE
export type PlanType = GAS_VALUE | ELECTRICITY_VALUE

export type ELECTRICITY_VALUE = 'Electricity'
export type GAS_VALUE = 'Gas'
export type BOTH_VALUE = 'Both'

export type YES_VALUE = 'Yes'
export type NO_VALUE = 'No'

export type BILLING_TYPE_MONTHLY = 'Monthly'
export type BILLING_TYPE_QUARTERLY = 'Quarterly'
export type PERIOD_SPEND_MORE = 'More'
export type PERIOD_SPEND_LESS = 'Less'

export type MISS_VALUE = 'Miss'
export type MS_VALUE = 'Ms'
export type MR_VALUE = 'Mr'
export type SIR_VALUE = 'Sir'
export type MRS_VALUE = 'Mrs'
export type DR_VALUE = 'Dr'
export type Mx_VALUE = 'Mx'
