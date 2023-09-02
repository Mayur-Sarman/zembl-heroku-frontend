import { useContext } from 'react'
import { AlertActions, AlertContext } from '../contexts'

export const useToast: UseToast = () => useContext(AlertContext)

export type UseToast = () => AlertActions
