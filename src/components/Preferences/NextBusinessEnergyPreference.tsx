import AccordionCard from '../AccordionCard'
import { Control } from 'react-hook-form'
import { LIFE_SUPPORT_EQUIPMENT_OPTIONS, YES_NO_OPTIONS } from '../../constants'
import TextNote from '../TextNote'
import ControllerSelectInput from '../Inputs/ControllerSelectInput'
import ControllerRadioGroupInput from '../Inputs/ControllerRadioGroupInput'

const NextBusinessEnergyPreference = ({ control, prefix }: NextBusinessEnergyPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Next Business Energy Preferences" bodyClassName="flex-col text-left gap-y-6">
      <TextNote>You have indicated that someone in the property has life support equipment.</TextNote>

      <div className="w-full lg:w-1/2">
        <ControllerSelectInput
          name={`${prefix}.machineType`}
          control={control}
          label="Please select your machine type"
          textLabel="Please select your machine type"
          placeholder="Select..."
          options={LIFE_SUPPORT_EQUIPMENT_OPTIONS}
          required
        />
      </div>

      <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.electricityUsedForBusinessPurposes`}
        label={'Do you confirm that the electricity used at your address is for business purposes?'}
        options={YES_NO_OPTIONS}
        required
      />

      <TextNote>
        This plan is not available to where the electricity at the site is not used for business purposes. Update your
        preference or please call Zembl on 1300 957 721 for assistance.
      </TextNote>
    </AccordionCard>
  )
}

interface NextBusinessEnergyPreferenceProps {
  control: Control
  prefix: string
}

export default NextBusinessEnergyPreference