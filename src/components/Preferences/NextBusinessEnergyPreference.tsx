import AccordionCard from '../AccordionCard'
import { Control, Controller, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import RadioGroupInput from '../Inputs/RadioGroupInput'
import { YES_NO_OPTIONS } from '../../constants'
import SelectInput from '../Inputs/SelectInput'
import TextNote from '../TextNote'

const NextBusinessEnergyPreference = ({ control, register, setValue }: NextBusinessEnergyPreferenceProps) => {
  return (
    <AccordionCard alwaysOpen open title="Next Business Energy Preferences" bodyClassName="flex-col text-left gap-y-6">
      <TextNote>You have indicated that someone in the property has life support equipment.</TextNote>

      <div className="w-full lg:w-1/2">
        <SelectInput
          label="Please select your machine type"
          textLabel="Please select your machine type"
          placeholder="Select..."
          options={[]}
          {...register('lifeSupportEquipmentType')}
          onChange={(e) => setValue('lifeSupportEquipmentType', e)}
        />
      </div>

      <Controller
        control={control}
        name="isElectricUsedForBusiness"
        render={({ field }) => (
          <RadioGroupInput
            {...field}
            label={'Do you confirm that the electricity used at your address is for business purposes?'}
            values={[field.value]}
            options={YES_NO_OPTIONS}
            buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
            optionsContainerClassName="flex flex-wrap w-full"
          />
        )}
      />

      <TextNote>
        This plan is not available to where the electricity at the site is not used for business purposes. Update your
        preference or please call Zembl on 1300 957 721 for assistance.
      </TextNote>
    </AccordionCard>
  )
}

interface NextBusinessEnergyPreferenceProps {
  control: Control
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export default NextBusinessEnergyPreference
