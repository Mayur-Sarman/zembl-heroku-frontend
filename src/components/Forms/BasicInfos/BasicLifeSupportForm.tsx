import AccordionCard from '../../AccordionCard'
import ControllerRadioGroupInput from '../../Inputs/ControllerRadioGroupInput'
import { REQUIRED_VALIDATION } from '../../../constants/validation'
import { YES_NO_OPTIONS } from '../../../constants'
import { Control } from 'react-hook-form'

const BasicLifeSupportForm = ({ control }: BasicLifeSupportFormProps) => {
  return (
    <AccordionCard alwaysOpen open title="Life Support" bodyClassName="w-full flex flex-col gap-3 text-left">
      <ControllerRadioGroupInput
        control={control}
        name="lifeSupport"
        rules={REQUIRED_VALIDATION}
        label={'Is there Life Support at the property?'}
        options={YES_NO_OPTIONS}
      />
    </AccordionCard>
  )
}

interface BasicLifeSupportFormProps {
  control: Control
}

export default BasicLifeSupportForm
