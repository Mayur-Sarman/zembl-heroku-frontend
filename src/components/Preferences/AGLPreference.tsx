import AccordionCard from '../AccordionCard'
import { Control, Controller, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import RadioGroupInput from '../Inputs/RadioGroupInput'
import { YES_NO_OPTIONS } from '../../constants'
import SelectInput from '../Inputs/SelectInput'
import TextNote from '../TextNote'
import { Typography } from '@material-tailwind/react'

const AGLPreference = ({ control, register, setValue }: AGLPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="AGL Preferences" bodyClassName="flex-col text-left gap-y-6">
      <TextNote>You have indicated that someone in the property has life support equipment.</TextNote>

      <div className="w-full">
        <div className='w-full lg:w-1/2'>
          <SelectInput
            label="What type of life support equipment?"
            textLabel="What type of life support equipment?"
            placeholder="Select..."
            options={[]}
            {...register('lifeSupportEquipmentType')}
            onChange={(e) => setValue('lifeSupportEquipmentType', e)}
          />
        </div>
        <Typography variant="small" className="mt-3">
          If your life support equipment requires both gas and electricity to operate, please inform your &lt;other fuel
          type&gt; retailer that you or someone at your property relies on life support equipment.
        </Typography>
      </div>

      <Typography>
        AGL will conduct a credit check and consider your history with them. AGL will use your details safely in
        accordance with their privacy and credit reporting policy which is available at{' '}
        <a href="https://www.agl.com.au/privacy-policy">https://www.agl.com.au/privacy-policy</a>.
      </Typography>

      <Controller
        control={control}
        name="isConsentCreditCheck"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={'Do you consent to a credit check?'}
            values={[field.value]}
            options={YES_NO_OPTIONS}
            buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
            optionsContainerClassName="flex flex-wrap w-full"
          />
        )}
      />

      <Controller
        control={control}
        name="isCarbonNeutralOptIn"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={
              "You now have the option to choose to go Carbon Neutral on AGL's Small Business electricity plans for $4 per week. Would you like to opt into that now?"
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

interface AGLPreferenceProps {
  control: Control
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export default AGLPreference
