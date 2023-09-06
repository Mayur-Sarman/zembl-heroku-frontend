import { Control, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import InputWithLabel from '../../Inputs/InputWithLabel'
import DateInput from '../../Inputs/DateInput'
import SelectInput from '../../Inputs/SelectInput'
import { COUNTRY_LIST_OPTIONS } from '../../../constants'

const ForeignPassportForm = ({ control, register, setValue }: ForeignPassportFormProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
      <SelectInput
        label="Select Country"
        textLabel="Select Country"
        placeholder="Select..."
        options={COUNTRY_LIST_OPTIONS}
        {...register('foreignPassport.country')}
        onChange={(e) => setValue('foreignPassport.country', e)}
      />
      <InputWithLabel label="Passport Number" textLabel="Passport Number" {...register('foreignPassport.passportNumber')} />
      <DateInput
        label="Expiry Date"
        name="foreignPassport.expiryDate"
        control={control}
        datepickerClassNames={'top-auto'}
      />
    </div>
  )
}

interface ForeignPassportFormProps {
  control: Control
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export default ForeignPassportForm
