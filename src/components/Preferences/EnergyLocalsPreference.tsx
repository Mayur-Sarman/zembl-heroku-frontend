import AccordionCard from '../AccordionCard'
import { Control } from 'react-hook-form'
import { YES_NO_OPTIONS } from '../../constants'
import TextNote from '../TextNote'
import ControllerRadioGroupInput from '../Inputs/ControllerRadioGroupInput'

const EnergyLocalsPreference = ({ control }: EnergyLocalsPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Energy Locals  Preferences" bodyClassName="flex-col text-left gap-y-6">
      <ControllerRadioGroupInput
        control={control}
        name="isConsentBureauCreditCheck"
        label={`As part of our signup process, we will be conducting a credit check with our credit bureau. Do you consent to a credit check?`}
        options={YES_NO_OPTIONS}
        required
      />

      <TextNote>
        This plan is not available to customers who do not consent to a credit check. Update your preference or please
        call Zembl on 1300 957 721 for assistance.
      </TextNote>
    </AccordionCard>
  )
}

interface EnergyLocalsPreferenceProps {
  control: Control
}

export default EnergyLocalsPreference
