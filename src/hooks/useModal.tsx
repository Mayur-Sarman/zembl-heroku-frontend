import { useContext } from 'react'
import { ModalActions, ModalContext } from '../contexts'

export const useModal: UseModal = () => useContext(ModalContext)

export type UseModal = () => ModalActions
