import { Control } from 'react-hook-form'
import { OFF_VALUE, ON_VALUE } from '../../../../../constants'
import { formatCurrency } from '../../../../../helpers/formatter'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'

const OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: OFF_VALUE },
]

const NBENewConnection = ({ connectionPrice, control, powerAware }: NBENewConnectionProps) => {
  const priceText = `This fee is ${formatCurrency(connectionPrice)} including GST`

  let powerNote = null
  switch (powerAware) {
    case ON_VALUE:
      powerNote = `Please note a once off meter read fee may be charged by your distributor and may appear on your first invoice. ${priceText}.`
      break
    case OFF_VALUE:
      powerNote = `Please note a once off meter read fee may be charged by your distributor and may appear on your first invoice. ${priceText}. Please ensure that the fuses are in the off position if there is no power on site.`
      break
  }

  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Are you aware if the power is on or off at the property?"
        control={control}
        name="powerAware"
        options={OPTIONS}
      />
      {/* Case power connected */}
      {powerAware && <TextNote>{powerNote}</TextNote>}
    </AccordionCard>
  )
}

interface NBENewConnectionProps {
  connectionPrice: number
  control: Control
  powerAware: string
}

export default NBENewConnection
