import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { BOTH_VALUE } from '../constants'

export const RegistrationContext = createContext({} as ModalActions)
export const RegistrationContextProvider = ({ children }: PropsWithChildren) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    phoneNumber: 'test',
    energyType: {
      energyType: BOTH_VALUE
    }
  } as RegistrationData)

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
  phoneNumber: string
  energyType: EnergyType
}

interface BusinessDetail {
  postCode: string
  abn: string
}

interface EnergyType {
  energyType: string
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
