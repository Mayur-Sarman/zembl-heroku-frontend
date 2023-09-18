import { Control } from 'react-hook-form'
import { ENERGY_TYPE_OPTIONS, NO_VALUE, YES_NO_OPTIONS } from '../../../constants'
import AccordionCard from '../../AccordionCard'
import DateInput from '../../Inputs/DateInput'
import ControllerRadioGroupInput from '../../Inputs/ControllerRadioGroupInput'
import { REQUIRED_VALIDATION } from '../../../constants/validation'

const EnergyTypeForm = ({ control, isMoving }: EnergyTypeFormProps) => {
  return (
    <AccordionCard alwaysOpen open title="Energy Type">
      <div className="w-full flex flex-col gap-3 text-left">
        <ControllerRadioGroupInput
          control={control}
          name="energyType"
          options={ENERGY_TYPE_OPTIONS}
          rules={REQUIRED_VALIDATION}
          label={'What type of business energy are you looking for?'}
        />
        <ControllerRadioGroupInput
          control={control}
          name="moreThanOne"
          options={YES_NO_OPTIONS}
          rules={REQUIRED_VALIDATION}
          label={'Do you have more than one business location?'}
        />
        <ControllerRadioGroupInput
          control={control}
          name="isMoving"
          options={YES_NO_OPTIONS}
          rules={REQUIRED_VALIDATION}
          label={'Are you moving to a new location?'}
        />
        <DateInput
          control={control}
          name="movingDate"
          datepickerClassNames={'top-auto'}
          label={'Moving Date?'}
          defaultDate={null}
          required
          containerClassName={`w-full lg:w-1/2 ${isMoving === NO_VALUE ? 'hidden' : ''}`}
        />
      </div>
    </AccordionCard>
  )
}

interface EnergyTypeFormProps {
  control: Control
  isMoving: string
}

export default EnergyTypeForm
