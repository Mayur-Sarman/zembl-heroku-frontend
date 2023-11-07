import { useContext } from 'react'
import RegistrationContext from '../contexts/RegistrationContext'

export const useRegistration = () => useContext(RegistrationContext)
