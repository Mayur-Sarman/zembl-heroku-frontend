import { Control } from 'react-hook-form'
import SecondaryAccountHolderForm from '../PersonalDetails/SecondaryAccountHolderForm'
import MomentumConcession from './ConcessionVariants/MomentumConcession'
import { RESIDENTIAL_VALUE } from '../../../constants'
import MomentumNewConnection from './NewConnectionVariants/Momentum/MomentumNewConnection'

const MomentumPersonalDetailsForm = ({
  control,
  isNewConnection,
  state,
  hasSecondaryContact,
  powerAware,
  registrationType,
  concessionCardHolder,
  concessionConsent,
  electricityConnectionPrice,
  gasConnectionPrice,
  gas,
  electricity,
}: MomentumPersonalDetailsFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      {registrationType === RESIDENTIAL_VALUE ? (
        <MomentumConcession
          control={control}
          concessionCardHolder={concessionCardHolder}
          concessionConsent={concessionConsent}
        />
      ) : null}

      <SecondaryAccountHolderForm control={control} hasSecondaryContact={hasSecondaryContact} />
      {isNewConnection ? (
        <MomentumNewConnection
          control={control}
          powerAware={powerAware}
          state={state}
          electricityConnectionPrice={electricityConnectionPrice}
          gasConnectionPrice={gasConnectionPrice}
          gas={gas}
          electricity={electricity}
        />
      ) : null}
    </div>
  )
}

interface MomentumPersonalDetailsFormProps {
  control: Control
  isNewConnection: boolean
  state: string
  hasSecondaryContact: string
  powerAware: string
  electricityConnectionPrice?: number | null
  gasConnectionPrice?: number | null

  registrationType: string
  concessionCardHolder: string
  concessionConsent: string
  gas: boolean
  electricity: boolean
}

export default MomentumPersonalDetailsForm
