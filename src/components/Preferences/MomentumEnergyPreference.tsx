import AccordionCard from '../AccordionCard'
import { Control, Controller } from 'react-hook-form'
import RadioGroupInput from '../Inputs/RadioGroupInput'
import { YES_NO_OPTIONS } from '../../constants'
import TextNote from '../TextNote'

const MomentumEnergyPreference = ({ control }: MomentumEnergyPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Momentum Energy Preferences" bodyClassName="flex-col text-left gap-y-6">
      <Controller
        control={control}
        name="isConsentMomentumCreditCheck"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={`Do you consent to Momentum performing a credit check on you? Do you understand that if you don’t meet Momentum’s credit requirements, your application may be rejected?`}
            values={[field.value]}
            options={YES_NO_OPTIONS}
            buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
            optionsContainerClassName="flex flex-wrap w-full"
          />
        )}
      />

      <TextNote>
        This plan is not available to customers who do not consent to a credit check. Update your preference or please
        call Zembl on 1300 957 721 for assistance.
      </TextNote>

      <Controller
        control={control}
        name="isAcceptMonthlyBilling"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={`For your electricity, would you like to receive monthly billing?`}
            values={[field.value]}
            options={YES_NO_OPTIONS}
            buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
            optionsContainerClassName="flex flex-wrap w-full"
          />
        )}
      />
    </AccordionCard>
  )
}

interface MomentumEnergyPreferenceProps {
  control: Control
}

export default MomentumEnergyPreference
