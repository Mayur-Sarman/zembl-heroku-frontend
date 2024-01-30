import { Control } from 'react-hook-form'
import SecondaryAccountHolderForm from '../PersonalDetails/SecondaryAccountHolderForm'
import EANewConnection from './NewConnectionVariants/EA/EANewConnection'

const EAPersonalDetailsForm = ({
  control,
  isNewConnection,
  state,
  hasSecondaryContact,
  powerAware,
  electricityConnectionPrice,
  gasConnectionPrice,
  accessMethod
}: EAPersonalDetailsFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      <SecondaryAccountHolderForm control={control} hasSecondaryContact={hasSecondaryContact} />
      {isNewConnection ? (
        <EANewConnection
          control={control}
          electricPrice={electricityConnectionPrice ?? null}
          gasPrice={gasConnectionPrice ?? null}
          powerAware={powerAware}
          state={state}
          accessMethod={accessMethod}
        />
      ) : null}
    </div>
  )
}

interface EAPersonalDetailsFormProps {
  control: Control
  isNewConnection: boolean
  state: string
  hasSecondaryContact: string
  powerAware: string
  electricityConnectionPrice?: string | null
  gasConnectionPrice?: string | null
  accessMethod: string
}

export default EAPersonalDetailsForm
