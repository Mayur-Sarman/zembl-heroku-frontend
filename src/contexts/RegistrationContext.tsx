import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { BOTH_VALUE, ELECTRICITY_VALUE, GAS_VALUE } from '../constants'

export const RegistrationContext = createContext({} as ModalActions)
export const RegistrationContextProvider = ({ children }: PropsWithChildren) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({} as RegistrationData)

  return (
    <RegistrationContext.Provider value={{ registrationData, setRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  )
}

interface ModalActions {
  setRegistrationData: Dispatch<SetStateAction<RegistrationData>>
  registrationData: RegistrationData
}

interface RegistrationData {
  energyType: EnergyType
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

RegistrationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export type { ModalActions, RegistrationData, BusinessDetail, EnergyType, EnergySpend }
export default RegistrationContext
