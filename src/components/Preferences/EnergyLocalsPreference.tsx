import AccordionCard from '../AccordionCard'
import { Control } from 'react-hook-form'
import { YES_NO_OPTIONS } from '../../constants'
import TextNote from '../TextNote'
import ControllerRadioGroupInput from '../Inputs/ControllerRadioGroupInput'

const EnergyLocalsPreference = ({ control, prefix, pref}: EnergyLocalsPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Energy Locals  Preferences" bodyClassName="flex-col text-left gap-y-6">
      <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.creditCheckConsent`}
        label={`As part of our signup process, we will be conducting a credit check with our credit bureau. Do you consent to a credit check?`}
        options={YES_NO_OPTIONS}
        required
      />
    {pref?.creditCheckConsent === 'No' ?
      <TextNote className='text-sm'>
      This plan is not available to customers who do not consent to a credit check. Update your preference or please
      call Zembl on 1300 957 721 for assistance.
    </TextNote>
    : null}
      
    </AccordionCard>
  )
}

interface EnergyLocalsPreferenceProps {
  control: Control
  prefix: string
  pref?: Record<string, string>
}

export default EnergyLocalsPreference
