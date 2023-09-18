import { Control } from 'react-hook-form'
import DateInput from '../../Inputs/DateInput'
import { COUNTRY_LIST_OPTIONS } from '../../../constants'
import ControllerSelectInput from '../../Inputs/ControllerSelectInput'
import { DATE_MUST_FUTURE, PASSPORT_VALIDATION, REQUIRED_VALIDATION } from '../../../constants/validation'
import ControllerInput from '../../Inputs/ControllerInput'

const ForeignPassportForm = ({ control }: ForeignPassportFormProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
      <ControllerSelectInput
        label="Select Country"
        textLabel="Select Country"
        placeholder="Select..."
        control={control}
        options={COUNTRY_LIST_OPTIONS}
        name={'foreignPassport.country'}
        rules={REQUIRED_VALIDATION}
      />
      <ControllerInput
        label="Passport Number"
        textLabel="Passport Number"
        name="foreignPassport.passportNumber"
        control={control}
        required
        rules={PASSPORT_VALIDATION}
      />
      <DateInput
        label="Expiry Date"
        name="foreignPassport.expiryDate"
        control={control}
        datepickerClassNames={'top-auto'}
        options={{ minDate: new Date() }}
        required
        rules={DATE_MUST_FUTURE}
        minDate={new Date()}
      />
    </div>
  )
}

interface ForeignPassportFormProps {
  control: Control
}

export default ForeignPassportForm
