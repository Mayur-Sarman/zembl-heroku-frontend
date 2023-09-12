import AccordionCard from '../AccordionCard'
import { Control, Controller, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import RadioGroupInput from '../Inputs/RadioGroupInput'
import { YES_NO_OPTIONS } from '../../constants'
import SelectInput from '../Inputs/SelectInput'
import TextNote from '../TextNote'

const EnergyAUPreference = ({ siteAddress, control, register, setValue }: EnergyAUPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Energy Australia Preferences" bodyClassName="flex-col text-left gap-y-6">
      <Controller
        control={control}
        name="isGreenpowerChargeInterested"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={`For the electricity at ${
              siteAddress ?? ''
            }, are you interested in Greenpower for an additional charge?`}
            values={[field.value]}
            options={YES_NO_OPTIONS}
            buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
            optionsContainerClassName="flex flex-wrap w-full"
          />
        )}
      />

      <TextNote>You have indicated that someone in the property has life support equipment.</TextNote>

      <div className="w-full lg:w-1/2">
        <SelectInput
          label="How much would you like to take up? There is an additional cost of 4.95 c/kWh (inc GST)"
          textLabel="How much would you like to take up? There is an additional cost of 4.95 c/kWh (inc GST)"
          placeholder="Select..."
          options={[]}
          {...register('greenPowerTakeUp')}
          onChange={(e) => setValue('greenPowerTakeUp', e)}
        />
      </div>

      <Controller
        control={control}
        name="isConsentUseEmail"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={'Energy Australia will use your email address to send your bills and any other notices, is that ok?'}
            values={[field.value]}
            options={YES_NO_OPTIONS}
            buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
            optionsContainerClassName="flex flex-wrap w-full"
          />
        )}
      />

      <TextNote>A fee of $1.69 Inc. GST may apply per bill</TextNote>
    </AccordionCard>
  )
}

interface EnergyAUPreferenceProps {
  control: Control
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  siteAddress?: string
}

export default EnergyAUPreference
