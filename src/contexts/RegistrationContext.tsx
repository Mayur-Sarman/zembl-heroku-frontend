import { Dispatch, PropsWithChildren, ReactNode, SetStateAction, createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { BOTH_VALUE, ELECTRICITY_VALUE, GAS_VALUE } from '../constants'

export const ModalContext = createContext({} as ModalActions)
export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({} as RegistrationData)

  return <ModalContext.Provider value={{ registrationData, setRegistrationData }}>{children}</ModalContext.Provider>
}

interface ModalActions {
  setRegistrationData: Dispatch<SetStateAction<RegistrationData>>
  registrationData: RegistrationData
}

interface RegistrationData {
  businessDetails: BusinessDetail
  dismissible?: boolean
  title?: ReactNode
  content: ReactNode
  footer?: ReactNode
  actions?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

interface BusinessDetail {
  postCode: string
  abn: string
}

interface EnergyType {
  energyType: ELECTRICITY_VALUE | GAS_VALUE | BOTH_VALUE
  hasMoreThanOneBusiness: boolean
  movingToNewLocation: boolean
  movingDate?: Date
}

interface EnergySpend {
  billingType: 'monthly' | 'quarterly'
  amountPerPeriod: 'more' | 'less'
}

ModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export type { ModalActions, RegistrationData, BusinessDetail, EnergyType, EnergySpend }
export default ModalContext
