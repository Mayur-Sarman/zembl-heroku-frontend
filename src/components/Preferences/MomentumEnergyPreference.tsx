import AccordionCard from '../AccordionCard'
import { Control } from 'react-hook-form'
import { YES_NO_OPTIONS } from '../../constants'
import TextNote from '../TextNote'
import ControllerRadioGroupInput from '../Inputs/ControllerRadioGroupInput'
const MomentumEnergyPreference = ({ control, prefix, pref }: MomentumEnergyPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Momentum Energy Preferences" bodyClassName="flex-col text-left gap-y-6">
      <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.creditCheckConsent`}
        label={`Do you consent to Momentum performing a credit check on you? Do you understand that if you don’t meet Momentum’s credit requirements, your application may be rejected?`}
        options={YES_NO_OPTIONS}
        required
      />
  { pref?.creditCheckConsent === 'No' ?
      <TextNote>
        This plan is not available to customers who do not consent to a credit check. Update your preference or please
        call Zembl on 1300 957 721 for assistance.
      </TextNote>
  : null}
    {prefix === 'electricityQuote.quotePreferences' || prefix === 'commonQuote.quotePreferences' ?
      <>
      <ControllerRadioGroupInput
        control={control}
        name={`${prefix}.consentMonthlyBilling`}
        label={`For your electricity, would you like to receive monthly billing?`}
        options={YES_NO_OPTIONS}
        required
      />

      {
        pref?.consentMonthlyBilling === 'Yes' ? 
        <TextNote>
        The plan you’ve chosen has some fixed billing and communication preferences. Whenever possible, Momentum will email you, but sometimes they’ll need to contact you via phone or post.
        </TextNote>
        : null
      }
      </>
    : null}
      
    </AccordionCard>
  )
}

interface MomentumEnergyPreferenceProps {
  control: Control
  prefix: string
  pref?: Record<string, string>
}

export default MomentumEnergyPreference
