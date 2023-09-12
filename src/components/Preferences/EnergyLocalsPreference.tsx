import AccordionCard from '../AccordionCard'
import { Control, Controller } from 'react-hook-form'
import RadioGroupInput from '../Inputs/RadioGroupInput'
import { YES_NO_OPTIONS } from '../../constants'
import TextNote from '../TextNote'

const EnergyLocalsPreference = ({ control }: EnergyLocalsPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Energy Locals  Preferences" bodyClassName="flex-col text-left gap-y-6">
      <Controller
        control={control}
        name="isConsentBureauCreditCheck"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={`As part of our signup process, we will be conducting a credit check with our credit bureau. Do you consent to a credit check?`}
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
    </AccordionCard>
  )
}

interface EnergyLocalsPreferenceProps {
  control: Control
}

export default EnergyLocalsPreference
