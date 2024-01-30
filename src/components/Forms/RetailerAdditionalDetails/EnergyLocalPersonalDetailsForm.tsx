import EnergyLocalConcession from './ConcessionVariants/EnergyLocalConcession'
import { RESIDENTIAL_VALUE } from '../../../constants'
import { Control } from 'react-hook-form'
import EnergyLocalNewConnection from './NewConnectionVariants/EnergyLocal/EnergyLocalNewConnection'

const EnergyLocalPersonalDetailsForm = ({
  registrationType,
  control,
  concessionCardHolder,
  concessionConsent,
  isNewConnection,
  electricalRenovationWork,
  connectionPrice
}: EnergyLocalPersonalDetailsFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      {registrationType === RESIDENTIAL_VALUE ? (
        <EnergyLocalConcession
          control={control}
          applyConcession={concessionCardHolder}
          concessionConsent={concessionConsent}
        />
      ) : null}

      {isNewConnection ? (
        <EnergyLocalNewConnection
          control={control}
          electricalRenovationWork={electricalRenovationWork}
          connectionPrice={connectionPrice}
        />
      ) : null}
    </div>
  )
}

interface EnergyLocalPersonalDetailsFormProps {
  control: Control
  concessionCardHolder?: string
  concessionConsent?: string
  registrationType: string
  isNewConnection: boolean
  electricalRenovationWork?: string
  connectionPrice?: string | null
}

export default EnergyLocalPersonalDetailsForm
