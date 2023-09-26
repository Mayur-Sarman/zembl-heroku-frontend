import { Control } from 'react-hook-form'
import DateInput from '../../Inputs/DateInput'
import { MEDICARE_COLOUR_LIST_OPTIONS, MEDICARE_REF_NO_OPTIONS } from '../../../constants'
import ControllerInput from '../../Inputs/ControllerInput'
import { DATE_MUST_FUTURE, REQUIRED_VALIDATION, getExactLengthValidation } from '../../../constants/validation'
import ControllerSelectInput from '../../Inputs/ControllerSelectInput'
import ControllerRadioGroupInput from '../../Inputs/ControllerRadioGroupInput'

const MedicareCardForm = ({ control }: MedicareCardFormProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
      <ControllerInput
        label="Medicare Card Number"
        control={control}
        textLabel="Medicare Card Number"
        name="proofOfIdentity.medicareCardNo"
        required
        rules={getExactLengthValidation(10)}
      />
      <ControllerSelectInput
        control={control}
        name="proofOfIdentity.referenceNo"
        options={MEDICARE_REF_NO_OPTIONS}
        label="Individual Reference Number"
        textLabel="Individual Reference Number"
        rules={REQUIRED_VALIDATION}
      />
      <div className="flex flex-col gap-y-3 col-span-1 lg:col-span-2">
        <ControllerRadioGroupInput
          control={control}
          name="proofOfIdentity.cardColour"
          label="Card Colour"
          required
          options={MEDICARE_COLOUR_LIST_OPTIONS}
        />
      </div>
      <DateInput
        label="Expiry Date"
        name="proofOfIdentity.expiryDate"
        control={control}
        datepickerClassNames={'top-auto'}
        minDate={new Date()}
        rules={DATE_MUST_FUTURE}
        required
      />
    </div>
  )
}

interface MedicareCardFormProps {
  control: Control
}

export default MedicareCardForm
