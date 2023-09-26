import { Control } from 'react-hook-form'
import { OFF_VALUE, ON_VALUE, UNSURE_VALUE } from '../../../../../constants'
import { formatCurrency } from '../../../../../helpers/formatter'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'

const OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: OFF_VALUE },
  { value: UNSURE_VALUE, label: UNSURE_VALUE },
]

const MomentumNewConnectionGas = ({ connectionPrice, control, isGasOn }: MomentumNewConnectionGasProps) => {
  const priceText = `The standard new connection fee is up to ${formatCurrency(connectionPrice)} including GST`

  let powerNote = null
  switch (isGasOn) {
    case ON_VALUE:
      powerNote = `Your network may read your meter up to 2 business days before or on the requested move in date. Momentum starts billing from this read date. Make sure there’s clear and safe access to your meter or it could mean extra fees and/or a delay to your connection or transfer.`
      break
    case OFF_VALUE:
      powerNote = `Because the gas is off, you’ll be invoiced for network connection fees. Make sure there’s clear and safe access to your meter or it could mean extra fees and/or a delay to your connection or transfer.`
      break
    case UNSURE_VALUE:
      powerNote = `If the gas is off, you’ll be invoiced for network connection fees. If the gas is on, your network may read your meter up to 2 business days before or on the requested move in date. Momentum starts billing from this read date. Make sure there’s clear and safe access to your meter or it could mean extra fees and / or a delay to your connection or transfer.`
      break
  }

  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Is the gas on at the property?"
        control={control}
        name="isGasOn"
        options={OPTIONS}
      />
      {/* Case power connected */}
      {isGasOn && powerNote && <TextNote>{powerNote}</TextNote>}
      <TextNote className="text-green-500">{priceText}</TextNote>
    </AccordionCard>
  )
}

interface MomentumNewConnectionGasProps {
  connectionPrice: number
  control: Control
  isGasOn: string
}

export default MomentumNewConnectionGas
