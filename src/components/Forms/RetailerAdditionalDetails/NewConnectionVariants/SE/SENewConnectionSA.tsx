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

const SENewConnectionSA = ({ electricPrice, gasPrice, control, powerAware }: SENewConnectionSAProps) => {
  const priceText = `${electricPrice ? `${formatCurrency(electricPrice)} for electricity` : ''} ${
    electricPrice && gasPrice ? 'and' : ''
  } ${gasPrice ? `${formatCurrency(gasPrice)} for gas` : ''}`

  const powerNote =
    powerAware === OFF_VALUE
      ? 'If the electricity is off, you must ensure the main switch is in the off position prior to the connection date.'
      : 'If the electricity is on, you can continue to use it. '

  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Are you aware if the power is on or off at the property?"
        control={control}
        name="powerAware"
        options={OPTIONS}
      />
      {/* Case power connected */}
      {powerAware ? (
        <TextNote>
          Please note that if a site visit is required, clear and safe access to the meter will be required on the date
          requested. If access to your meter is not provided on that day, a second visit may be required, and this will
          incur additional charges. {powerNote} The cost for your move-in will be {priceText}
        </TextNote>
      ) : null}
    </AccordionCard>
  )
}

interface SENewConnectionSAProps {
  electricPrice: number
  gasPrice: number
  control: Control
  powerAware: string
}

export default SENewConnectionSA
