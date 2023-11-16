import AccordionCard from '../../AccordionCard'
import ControllerRadioGroupInput from '../../Inputs/ControllerRadioGroupInput'
import { Control } from 'react-hook-form'
import { REQUIRED_VALIDATION } from '../../../constants/validation'
import { SUBSCRIBE_TYPE_OPTIONS } from '../../../constants'

const BillAndMessageForm = ({ control }: BillAndMessageFormProps) => {
  return (
    <AccordionCard alwaysOpen open title="Bill & Messages" bodyClassName="">
      <ControllerRadioGroupInput
        control={control}
        name="billType"
        rules={REQUIRED_VALIDATION}
        label={
          'How would you like to receive your bills and other notices, like disconnection warnings and price change notifications?'
        }
        options={SUBSCRIBE_TYPE_OPTIONS}
      />
    </AccordionCard>
  )
}

interface BillAndMessageFormProps {
  control: Control
}

export default BillAndMessageForm
