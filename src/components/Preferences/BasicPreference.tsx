import AccordionCard from '../AccordionCard'
import { Control, Controller } from 'react-hook-form'
import RadioGroupInput from '../Inputs/RadioGroupInput'
import { YES_NO_OPTIONS } from '../../constants'

const BasicPreference = ({ control }: BasicPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Preferences" bodyClassName="flex-col text-left gap-y-6">
      <Controller
        control={control}
        name="isRequireMedicalEquipment"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={'Does anyone at the premise require the use of medical equipment for life support?'}
            values={[field.value]}
            options={YES_NO_OPTIONS}
            buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
            optionsContainerClassName="flex flex-wrap w-full"
          />
        )}
      />

      <Controller
        control={control}
        name="isReceiveMonthlyBilling"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={'Would you like to receive monthly billing?'}
            values={[field.value]}
            options={YES_NO_OPTIONS}
            buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
            optionsContainerClassName="flex flex-wrap w-full"
          />
        )}
      />

      <Controller
        control={control}
        name="isConsentMomentumCreditCheck"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={'Do you consent to Momentum performing a credit check on you?'}
            values={[field.value]}
            options={YES_NO_OPTIONS}
            buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
            optionsContainerClassName="flex flex-wrap w-full"
          />
        )}
      />

      <Controller
        control={control}
        name="isAcknowledgedMomentumCreditRequirement"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={
              'Do you understand if you don’t meet Momentum’s credit requirements, your application may be rejected?'
            }
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

interface BasicPreferenceProps {
  control: Control
}

export default BasicPreference
