import { Control } from 'react-hook-form'
import { OFF_VALUE, ON_VALUE, UNSURE_VALUE } from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'

const OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: OFF_VALUE },
  { value: UNSURE_VALUE, label: UNSURE_VALUE },
]

const MomentumNewConnectionNSW = ({ connectionPrice, control, powerAware }: MomentumNewConnectionNSWProps) => {
  const priceText = `The standard new connection fee is up to ${connectionPrice ?? '$0'} including GST`

  let powerNote = null
  switch (powerAware) {
    case ON_VALUE:
      powerNote = `Your network has up to 4 business days from the date of the service order to attend the site and read your meter. Momentum starts billing from the date of this read. Make sure there’s clear and safe access to your meter or it could mean extra fees and/or a delayed connection or transfer.`
      break
    case OFF_VALUE:
      powerNote = `Make sure your main switch is in the off position, and there’s clear and safe access to your meter or it could mean extra fees and/or a delayed connection or transfer.`
      break
    case UNSURE_VALUE:
      powerNote = `If the power’s off, make sure your main switch is in the off position. If the power’s on, your network has 4 business days from the date of the service order to read your meter onsite. Momentum starts billing from this read date. Make sure there’s clear and safe access to your meter or it could mean extra fees and/or a delayed connection or transfer`
      break
  }

  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Are you aware if the power is on or off at the property?"
        control={control}
        name="newConnection.powerAware"
        options={OPTIONS}
      />
      {/* Case power connected */}
      {powerAware && <TextNote>{powerNote}</TextNote>}
      <TextNote>{priceText}</TextNote>
    </AccordionCard>
  )
}

interface MomentumNewConnectionNSWProps {
  connectionPrice?: string | null
  control: Control
  powerAware: string
}

export default MomentumNewConnectionNSW
