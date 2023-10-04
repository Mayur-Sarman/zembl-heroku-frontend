import { Control } from 'react-hook-form'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import { OFF_VALUE, ON_VALUE } from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import TextNote from '../../../../TextNote'

const OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: OFF_VALUE },
]

const EANewConnectionSA = ({ control, powerAware, powerOnText, powerOffText }: AGLNewConnectionSAProps) => {
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

interface AGLNewConnectionSAProps {
  control: Control
  powerAware: string
  powerOnText: string
  powerOffText: string
}

export default EANewConnectionSA
