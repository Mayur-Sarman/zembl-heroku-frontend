import { Control } from 'react-hook-form'
import { formatCurrency } from '../../../../../helpers/formatter'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import { OFF_VALUE, ON_VALUE } from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import TextNote from '../../../../TextNote'

const OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: OFF_VALUE },
]

const EANewConnectionSA = ({ control, awarePowerOff, electricPrice, gasPrice }: AGLNewConnectionSAProps) => {
  const priceText = `${electricPrice ? `electricity is ${formatCurrency(electricPrice)}` : ''} ${
    electricPrice && gasPrice ? 'and' : ''
  } ${gasPrice ? `gas is ${formatCurrency(gasPrice)}` : ''}`

  const infoText =
    awarePowerOff === ON_VALUE
      ? `The connection fee for your ${priceText} including GST, which will appear on your first bill. A technician will require clear access to the main switch and/or meter. Please ensure there are no access restrictions such as locked gates and unrestrained animals as you may be charged additional fees if the provider incurs additional costs.`
      : `To ensure your power is connected, you must make sure the main switch is turned off prior to the connection date. The connection fee for your electricity is $X and/or gas is $X including GST, which will appear on your first bill. A technician will require clear access to the main switch and/or meter. Please ensure there are no access restrictions such as locked gates and unrestrained animals as you may be charged additional fees if the provider incurs additional costs.`

  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Are you aware if the power is on or off at the property?"
        control={control}
        name="awarePowerOff"
        options={OPTIONS}
      />
      {/* Case power connected */}
      {awarePowerOff ? <TextNote>{infoText}</TextNote> : null}
    </AccordionCard>
  )
}

interface AGLNewConnectionSAProps {
  control: Control
  awarePowerOff: string
  electricPrice: number | null
  gasPrice: number | null
}

export default EANewConnectionSA
