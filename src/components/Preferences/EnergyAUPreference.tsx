import AccordionCard from '../AccordionCard'
import { Control } from 'react-hook-form'
import { GREEN_POWER_OPTIONS, YES_NO_OPTIONS } from '../../constants'
import TextNote from '../TextNote'
import ControllerSelectInput from '../Inputs/ControllerSelectInput'
import ControllerRadioGroupInput from '../Inputs/ControllerRadioGroupInput'

const EnergyAUPreference = ({ siteAddress, control, prefix }: EnergyAUPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Energy Australia Preferences" bodyClassName="flex-col text-left gap-y-6">
      <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.interestedGreenPower`}
        label={`For the electricity at ${
          siteAddress ?? ''
        }, are you interested in Greenpower for an additional charge?`}
        options={YES_NO_OPTIONS}
        required
      />

      <TextNote>You have indicated that someone in the property has life support equipment.</TextNote>

      <div className="w-full lg:w-1/2">
        <ControllerSelectInput
          control={control}
          name={`${prefix}.greenPowerOption`}
          label="How much would you like to take up? There is an additional cost of 4.95 c/kWh (inc GST)"
          textLabel="How much would you like to take up? There is an additional cost of 4.95 c/kWh (inc GST)"
          placeholder="Select..."
          options={GREEN_POWER_OPTIONS}
          required
        />
      </div>

      <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.receiveEmailBills`}
        label={'Energy Australia will use your email address to send your bills and any other notices, is that ok?'}
        options={YES_NO_OPTIONS}
        required
      />

      <TextNote>A fee of $1.69 Inc. GST may apply per bill</TextNote>
    </AccordionCard>
  )
}

interface EnergyAUPreferenceProps {
  control: Control
  siteAddress?: string
  prefix: string
}

export default EnergyAUPreference