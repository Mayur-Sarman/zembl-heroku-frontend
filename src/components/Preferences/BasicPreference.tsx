import AccordionCard from '../AccordionCard'
import { Control } from 'react-hook-form'
import { YES_NO_OPTIONS } from '../../constants'
import ControllerRadioGroupInput from '../Inputs/ControllerRadioGroupInput'

const BasicPreference = ({ control }: BasicPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Preferences" bodyClassName="flex-col text-left gap-y-6">
      <ControllerRadioGroupInput
        control={control}
        name="isRequireMedicalEquipment"
        required
        label={'Does anyone at the premise require the use of medical equipment for life support?'}
        options={YES_NO_OPTIONS}
      />

      <ControllerRadioGroupInput
        control={control}
        name="isReceiveMonthlyBilling"
        required
        label={'Would you like to receive monthly billing?'}
        options={YES_NO_OPTIONS}
      />

      <ControllerRadioGroupInput
        control={control}
        name="creditCheckConsent"
        required
        label={'Do you consent to Momentum performing a credit check on you?'}
        options={YES_NO_OPTIONS}
      />

      <ControllerRadioGroupInput
        control={control}
        name="isAcknowledgedMomentumCreditRequirement"
        required
        label={'Do you understand if you don’t meet Momentum’s credit requirements, your application may be rejected?'}
        options={YES_NO_OPTIONS}
      />
    </AccordionCard>
  )
}

interface BasicPreferenceProps {
  control: Control
}

export default BasicPreference
