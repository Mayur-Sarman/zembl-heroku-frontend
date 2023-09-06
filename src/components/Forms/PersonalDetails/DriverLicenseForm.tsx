import { Control, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import InputWithLabel from '../../Inputs/InputWithLabel'
import DateInput from '../../Inputs/DateInput'
import SelectInput from '../../Inputs/SelectInput'
import { STATE_LIST_OPTIONS } from '../../../constants'

const DriverLicenseForm = ({ control, register, setValue }: DriverLicenseFormProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
      <InputWithLabel label="License Number" textLabel="License Number" {...register('driverLicense.licenseNumber')} />
      <InputWithLabel
        label="License Card Number"
        textLabel="License Card Number"
        {...register('driverLicense.cardNumber')}
      />
      <DateInput
        label="Expiry Date"
        name="driverLicense.expiryDate"
        control={control}
        datepickerClassNames={'top-auto'}
      />
      <SelectInput
        label="Driver's License State"
        textLabel="Driver's License State"
        placeholder="Select..."
        options={STATE_LIST_OPTIONS}
        {...register('driverLicense.state')}
        onChange={(e) => setValue('driverLicense.state', e)}
      />
    </div>
  )
}

interface DriverLicenseFormProps {
  control: Control
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export default DriverLicenseForm
