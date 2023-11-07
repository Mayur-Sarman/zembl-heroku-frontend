import { Control } from 'react-hook-form'
import { QLD_VALUE } from '../../../constants'
import SecondaryAccountHolderForm from '../PersonalDetails/SecondaryAccountHolderForm'
import BlueNRGNewConnectionQLD from './NewConnectionVariants/BlueNRG/BlueNRGNewConnectionQLD'

const BlueNRGPersonalDetailsForm = ({
  control,
  isNewConnection,
  state,
  electric,
  hasSecondaryContact,
  hasPower,
  connectionPrice,
  connectionDate,
}: BlueNRGPersonalDetailsFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      <SecondaryAccountHolderForm control={control} hasSecondaryContact={hasSecondaryContact} />
      {isNewConnection && electric && state === QLD_VALUE.shortName ? (
        <BlueNRGNewConnectionQLD
          control={control}
          businessHoursFee={connectionPrice ?? null}
          nonBusinessHoursFee={connectionPrice ?? null}
          connectionDate={connectionDate}
          hasPower={hasPower}
        />
      ) : null}
    </div>
  )
}

interface BlueNRGPersonalDetailsFormProps {
  control: Control
  isNewConnection: boolean
  state?: string
  electric: boolean
  hasSecondaryContact: string
  hasPower?: string
  connectionPrice?: number | null
  connectionDate: Date | null
}

export default BlueNRGPersonalDetailsForm
