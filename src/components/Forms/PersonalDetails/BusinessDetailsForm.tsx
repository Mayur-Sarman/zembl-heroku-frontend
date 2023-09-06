import { FieldValues, UseFormRegister } from 'react-hook-form'
import AccordionCard from '../../AccordionCard'
import InputWithLabel from '../../Inputs/InputWithLabel'

const BusinessDetailsForm = ({ register }: BusinessDetailsFormProps) => {
  return (
    <AccordionCard alwaysOpen open title="Business Details" bodyClassName="w-full flex flex-col gap-3 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
        <InputWithLabel label="Legal Name" textLabel="Legal Name" {...register('legalName')} />
        <InputWithLabel label="ABN Number" textLabel="ABN Number" {...register('abn')} />
        <InputWithLabel label="Position" textLabel="Position" {...register('position')} />
      </div>
    </AccordionCard>
  )
}

interface BusinessDetailsFormProps {
  register: UseFormRegister<FieldValues>
}

export default BusinessDetailsForm
