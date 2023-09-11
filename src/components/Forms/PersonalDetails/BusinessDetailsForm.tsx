import { FieldValues, UseFormRegister } from 'react-hook-form'
import AccordionCard from '../../AccordionCard'
import InputWithLabel from '../../Inputs/InputWithLabel'

const BusinessDetailsForm = ({ register, readOnly, compactForm }: BusinessDetailsFormProps) => {
  return (
    <AccordionCard alwaysOpen open title="Business Details" bodyClassName="w-full flex flex-col gap-3 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
        <InputWithLabel label="Legal Name" textLabel="Legal Name" {...register('legalName')} readOnly={readOnly} />
        <InputWithLabel label="ABN Number" textLabel="ABN Number" {...register('abn')} readOnly={readOnly} />
        {compactForm ? null : (
          <InputWithLabel label="Position" textLabel="Position" {...register('position')} readOnly={readOnly} />
        )}
      </div>
    </AccordionCard>
  )
}

interface BusinessDetailsFormProps {
  register: UseFormRegister<FieldValues>
  readOnly?: boolean
  compactForm?: boolean
}

export default BusinessDetailsForm
