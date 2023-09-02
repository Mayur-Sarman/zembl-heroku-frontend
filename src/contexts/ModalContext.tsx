import { PropsWithChildren, ReactNode, createContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'

const DISMISSIBLE_CONFIGS = {
  enabled: true,
  escapeKey: true,
  outsidePress: false,
}

export const ModalContext = createContext({} as ModalActions)
export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [modalConfig, setModalConfig] = useState<ModalConfigs | null>(null)

  const openModal = useCallback((modalConfigs: ModalConfigs) => {
    setModalConfig(modalConfigs)
  }, [])

  const closeModal = useCallback(() => {
    setModalConfig(null)
  }, [])

  const modalTitleDisplay = modalConfig?.title ? <DialogHeader>{modalConfig?.title}</DialogHeader> : null
  const modalContentDisplay = <DialogBody>{modalConfig?.content ?? <></>}</DialogBody>
  const modalFooterDisplay = modalConfig?.footer ? <DialogFooter>{modalConfig?.footer}</DialogFooter> : null
  const dismissConfig = modalConfig?.dismissible ? DISMISSIBLE_CONFIGS : { enabled: false }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <Dialog
        open={!!modalConfig}
        handler={openModal}
        dismiss={dismissConfig}
      >
        {modalTitleDisplay}
        {modalContentDisplay}
        {modalFooterDisplay}
      </Dialog>
      {children}
    </ModalContext.Provider>
  )
}

export interface ModalActions {
  openModal: (modalConfigs: ModalConfigs) => void
  closeModal: VoidFunction
}

export interface ModalConfigs {
  open: boolean
  dismissible?: boolean
  title?: ReactNode
  content: ReactNode
  footer?: ReactNode
  actions?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

ModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ModalContext
