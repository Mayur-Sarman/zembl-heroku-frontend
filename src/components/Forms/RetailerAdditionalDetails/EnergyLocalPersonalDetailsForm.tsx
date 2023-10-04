import EnergyLocalConcession from './ConcessionVariants/EnergyLocalConcession'
import { RESIDENTIAL_VALUE } from '../../../constants'
import { Control } from 'react-hook-form'
import SecondaryAccountHolderForm from '../PersonalDetails/SecondaryAccountHolderForm'
import EnergyLocalNewConnection from './NewConnectionVariants/EnergyLocal/EnergyLocalNewConnection'

const EnergyLocalPersonalDetailsForm = ({
  registrationType,
  control,
  concessionCardHolder,
  concessionConsent,

  hasSecondaryContact,

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

      <SecondaryAccountHolderForm control={control} hasSecondaryContact={hasSecondaryContact} />
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
  hasSecondaryContact: string
  isNewConnection: boolean
  electricalRenovationWork: string
  connectionPrice: number | null
}

export default EnergyLocalPersonalDetailsForm
