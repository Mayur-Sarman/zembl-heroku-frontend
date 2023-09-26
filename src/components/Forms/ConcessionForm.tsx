import ControllerSelectInput from '../Inputs/ControllerSelectInput'
import { AGL_CONCESSION_CARD_TYPES } from '../../constants'
import ControllerInput from '../Inputs/ControllerInput'
import DateInput from '../Inputs/DateInput'
import { Control } from 'react-hook-form'
import { DATE_MUST_FUTURE } from '../../constants/validation'

const ConcessionForm = ({ control }: ConcessionFormProps) => {
  return (
    <div className="flex flex-col w-full lg:w-1/2 gap-6">
      <ControllerSelectInput
        label="Concession Card Type"
        textLabel="Concession Card Type"
        name="concessionCardType"
        control={control}
        options={AGL_CONCESSION_CARD_TYPES}
        required
      />
      <ControllerInput
        textLabel="Concession Number"
        inputLabel="Concession Number"
        name="concessionCardNo"
        control={control}
        required
      />
      <DateInput label="Concession Start Date" name="concessionStartDate" control={control} required />
      <DateInput
        label="Concession Expiry Date"
        name="concessionExpiryDate"
        control={control}
        required
        rules={DATE_MUST_FUTURE}
      />
    </div>
  )
}

interface ConcessionFormProps {
  control: Control
}

export default ConcessionForm
