import AccordionCard from '../../AccordionCard'
import ControllerRadioGroupInput from '../../Inputs/ControllerRadioGroupInput'
import { REQUIRED_VALIDATION } from '../../../constants/validation'
import { YES_NO_OPTIONS, NO_VALUE } from '../../../constants'
import { Control } from 'react-hook-form'

const SOLAR_OPTIONS = YES_NO_OPTIONS
const SOLAR_CONSIDERATION_OPTIONS = YES_NO_OPTIONS

const SolarForm = ({ control, solar }: SolarFormProps) => {
  return (
    <AccordionCard alwaysOpen open title="Solar" bodyClassName="w-full flex flex-col gap-3 text-left">
      <ControllerRadioGroupInput
        control={control}
        name="solar"
        rules={REQUIRED_VALIDATION}
        label={'Do you have Solar at the property?'}
        options={SOLAR_OPTIONS}
      />
      {solar === NO_VALUE ? 
        <ControllerRadioGroupInput
        control={control}
        name="solarConsideration"
        rules={REQUIRED_VALIDATION}
        label={'Will you be considering solar panels in the next 12 months?'}
        options={SOLAR_CONSIDERATION_OPTIONS}
        />
      : null}
      
    </AccordionCard>
  )
}

interface SolarFormProps {
  control: Control
  solar?: string | null
}

export default SolarForm
