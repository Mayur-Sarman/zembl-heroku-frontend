import { Control } from 'react-hook-form'
import DateInput from '../../Inputs/DateInput'
import { STATE_LIST_OPTIONS } from '../../../constants'
import ControllerInput from '../../Inputs/ControllerInput'
import { CUSTOM_SF_TEXT_VALIDATION, REQUIRED_VALIDATION } from '../../../constants/validation'
import ControllerSelectInput from '../../Inputs/ControllerSelectInput'

const DriverLicenseForm = ({ control }: DriverLicenseFormProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
      <ControllerInput
        name="driverLicense.licenseNumber"
        control={control}
        required
        rules={CUSTOM_SF_TEXT_VALIDATION}
        label="License Number"
        textLabel="License Number"
      />
      <ControllerInput
        name="driverLicense.cardNumber"
        control={control}
        required
        rules={CUSTOM_SF_TEXT_VALIDATION}
        label="License Card Number"
        textLabel="License Card Number"
      />
      <DateInput
        name="driverLicense.expiryDate"
        control={control}
        required
        label="Expiry Date"
        datepickerClassNames={'top-auto'}
      />
      <ControllerSelectInput
        label="Driver's License State"
        textLabel="Driver's License State"
        placeholder="Select..."
        control={control}
        options={STATE_LIST_OPTIONS}
        name={'driverLicense.state'}
        rules={REQUIRED_VALIDATION}
      />
    </div>
  )
}

interface DriverLicenseFormProps {
  control: Control
}

export default DriverLicenseForm
