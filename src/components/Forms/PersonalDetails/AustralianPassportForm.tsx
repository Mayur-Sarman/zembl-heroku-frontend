import { Control, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import InputWithLabel from '../../Inputs/InputWithLabel'
import DateInput from '../../Inputs/DateInput'

const AustralianPassportForm = ({ control, register }: AustralianPassportFormProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
      <InputWithLabel label="Passport Number" textLabel="Passport Number" {...register('australianPassport.passportNumber')} />
      <DateInput
        label="Expiry Date"
        name="australianPassport.expiryDate"
        control={control}
        datepickerClassNames={'top-auto'}
      />
    </div>
  )
}

interface AustralianPassportFormProps {
  control: Control
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export default AustralianPassportForm
