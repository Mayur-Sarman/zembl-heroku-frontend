import AccordionCard from '../../AccordionCard'
import SelectInput from '../../Inputs/SelectInput'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import LifeSupportNote from '../../Notes/LifeSupportNote'

const LifeSupportForm = ({ register, setValue }: LifeSupportFormProps) => {
  return (
    <AccordionCard title="Life Support" alwaysOpen open bodyClassName="w-full flex flex-col gap-3 text-left">
      <LifeSupportNote />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
        <div className="w-full lg:col-span-2 lg:w-1/2">
          <SelectInput
            label="Does your life support equipment require electricity, gas, or both?"
            textLabel="Does your life support equipment require electricity, gas, or both?"
            placeholder="Select..."
            options={[]}
            {...register('lifeSupportRequireEnergyType')}
            onChange={(e) => setValue('lifeSupportRequireEnergyType', e)}
          />
        </div>
        <div className="w-full lg:col-span-2 lg:w-1/2">
          <SelectInput
            label="What type of life support equipment?"
            textLabel="What type of life support equipment?"
            placeholder="Select..."
            options={[]}
            {...register('lifeSupportEquipmentType')}
            onChange={(e) => setValue('lifeSupportEquipmentType', e)}
          />
        </div>
      </div>
    </AccordionCard>
  )
}

interface LifeSupportFormProps {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export default LifeSupportForm
