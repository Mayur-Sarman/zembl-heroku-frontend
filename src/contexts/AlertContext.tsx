import { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { uniqueId } from 'lodash'
import { color, variant, children } from '@material-tailwind/react/types/components/alert'

import { Alert } from '@material-tailwind/react'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid'

const ALERT_DEFAULT_VARIANT: variant = 'filled'
const ALERT_DEFAULT_DURATION = 5000
const AlertContainer = ({ children }: PropsWithChildren) => (
  <div className="max-w-full flex flex-col place-items-center absolute z-20 mx-auto pointer-events-none w-full">
    {children}
  </div>
)

export const AlertContext = createContext({} as AlertActions)

export const AlertContextProvider = ({ children }: PropsWithChildren) => {
  const [alerts, setAlerts] = useState<Record<string, AlertData>>({})

  const onAlertClosedHandler = useCallback((targetIndex: string) => {
    setAlerts((prev) => {
      const updatedAlerts = Object.entries(prev).reduce((prevAlerts, alert) => {
        const [alertKey, alertItem] = alert

        return { ...prevAlerts, [alertKey]: { ...alertItem, open: alertItem.open && alertKey !== targetIndex } }
      }, {})

      return updatedAlerts
    })
  }, [])

  const fireAlert = useCallback(
    (newAlert: AlertData): string => {
      const id = uniqueId()
      setAlerts((prev) => ({ ...prev, [id]: { ...newAlert, open: true } }))

      if (newAlert?.duration) {
        const duration = newAlert.duration === 'default' ? ALERT_DEFAULT_DURATION : newAlert.duration
        setTimeout(() => onAlertClosedHandler(id), duration)
      }

      return id
    },
    [onAlertClosedHandler],
  )

  const alertDisplay = useMemo(
    () =>
      Object.entries(alerts).map((alert) => {
        const [alertId, alertData] = alert

        let icon = null
        let alertColor: color = 'gray'
        switch (alertData.type) {
          case 'success': {
            alertColor = 'green'
            icon = <CheckCircleIcon width={25} height={25} />
            break
          }
          case 'warn': {
            alertColor = 'amber'
            icon = <ExclamationTriangleIcon width={25} height={25} />
            break
          }
          case 'error': {
            alertColor = 'red'
            icon = <ExclamationCircleIcon width={25} height={25} />
            break
          }
          case 'info':
          default:
            icon = <InformationCircleIcon width={25} height={25} />
            break
        }

        if (alertData.icon) {
          icon = alertData.icon
        }

        return (
          <Alert
            key={alertId}
            open={alertData.open}
            onClose={() => onAlertClosedHandler(alertId)}
            action={alertData.actions}
            icon={icon}
            color={alertColor}
            className="mt-1 w-fit pointer-events-auto"
            variant={ALERT_DEFAULT_VARIANT}
          >
            {alertData.children}
          </Alert>
        )
      }),
    [alerts, onAlertClosedHandler],
  )

  return (
    <AlertContext.Provider value={{ fireAlert, onAlertClosedHandler }}>
      <AlertContainer>{alertDisplay}</AlertContainer>
      {children}
    </AlertContext.Provider>
  )
}

export interface AlertActions {
  fireAlert: (alertData: AlertData) => string
  onAlertClosedHandler: (alertId: string) => void
}

interface AlertData {
  children: children
  type: 'info' | 'success' | 'warn' | 'error'
  actions?: React.ReactElement
  icon?: React.ReactElement
  duration?: number | 'default'
  className?: string
  open?: boolean
}

AlertContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
