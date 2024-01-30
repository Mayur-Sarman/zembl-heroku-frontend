import SecondaryAccountHolderForm from '../PersonalDetails/SecondaryAccountHolderForm'
import { Control } from 'react-hook-form'
import NBENewConnection from './NewConnectionVariants/NBE/NBENewConnection'

const NBEPersonalDetailsForm = ({
  control,
  hasSecondaryContact,
  powerAware,
  connectionPrice,
  isNewConnection,
}: NBEPersonalDetailsForm) => {
  return (
    <div className="flex flex-col gap-6">
      <SecondaryAccountHolderForm control={control} hasSecondaryContact={hasSecondaryContact} />
      {isNewConnection ? (
        <NBENewConnection control={control} powerAware={powerAware} connectionPrice={connectionPrice} />
      ) : null}
    </div>
  )
}

interface NBEPersonalDetailsForm {
  control: Control
  hasSecondaryContact: string
  powerAware: string
  connectionPrice?: string | null
  isNewConnection: boolean
}

export default NBEPersonalDetailsForm
