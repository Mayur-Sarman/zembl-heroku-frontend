import { Control } from 'react-hook-form'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'
import { OFF_VALUE, ON_VALUE } from '../../../../../constants'

const OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: `${OFF_VALUE}` },
]

const EANewConnectionVIC = ({ control, powerAware, powerOnText, powerOffText }: EANewConnectionVICProps) => {
  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Are you aware if the power is on or off at the property?"
        control={control}
        name="newConnection.powerAware"
        options={OPTIONS}
      />
      {/* Case power connected */}
      {powerAware ? <TextNote>{powerAware === ON_VALUE ? powerOnText : powerOffText}</TextNote> : null}
    </AccordionCard>
  )
}

interface EANewConnectionVICProps {
  control: Control
  powerAware: string
  powerOnText: string
  powerOffText: string
}

export default EANewConnectionVIC
