import { Control } from 'react-hook-form'
import DateInput from '../../Inputs/DateInput'
import ControllerInput from '../../Inputs/ControllerInput'
import { PASSPORT_VALIDATION } from '../../../constants/validation'

const AustralianPassportForm = ({ control }: AustralianPassportFormProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
      <ControllerInput
        control={control}
        label="Passport Number"
        textLabel="Passport Number"
        name='australianPassport.passportNumber'
        required
        rules={PASSPORT_VALIDATION}
      />
      <DateInput
        label="Expiry Date"
        name="australianPassport.expiryDate"
        control={control}
        datepickerClassNames={'top-auto'}
        required
      />
    </div>
  )
}

interface AustralianPassportFormProps {
  control: Control
}

export default AustralianPassportForm
