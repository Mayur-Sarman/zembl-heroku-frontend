import AccordionCard from '../AccordionCard'
import { Control } from 'react-hook-form'
import { YES_NO_OPTIONS } from '../../constants'
import TextNote from '../TextNote'
import ControllerRadioGroupInput from '../Inputs/ControllerRadioGroupInput'

const MomentumEnergyPreference = ({ control }: MomentumEnergyPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Momentum Energy Preferences" bodyClassName="flex-col text-left gap-y-6">
      <ControllerRadioGroupInput
        control={control}
        name="isConsentMomentumCreditCheck"
        label={`Do you consent to Momentum performing a credit check on you? Do you understand that if you don’t meet Momentum’s credit requirements, your application may be rejected?`}
        options={YES_NO_OPTIONS}
        required
      />

      <TextNote>
        This plan is not available to customers who do not consent to a credit check. Update your preference or please
        call Zembl on 1300 957 721 for assistance.
      </TextNote>

      <ControllerRadioGroupInput
        control={control}
        name="isAcceptMonthlyBilling"
        label={`For your electricity, would you like to receive monthly billing?`}
        options={YES_NO_OPTIONS}
        required
      />
    </AccordionCard>
  )
}

interface MomentumEnergyPreferenceProps {
  control: Control
}

export default MomentumEnergyPreference
