import { Control } from 'react-hook-form'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'
import { formatCurrency } from '../../../../../helpers/formatter'
import { OFF_VALUE, ON_VALUE } from '../../../../../constants'

const OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: 'Off + Ausgrid' },
]

const EANewConnectionACT = ({ control, awarePowerOff, electricPrice, gasPrice }: EANewConnectionACTProps) => {
  const priceText = `${electricPrice ? `electricity is ${formatCurrency(electricPrice)}` : ''} ${
    electricPrice && gasPrice ? 'and' : ''
  } ${gasPrice ? `gas is ${formatCurrency(gasPrice)}` : ''}`

  const infoText =
    awarePowerOff === ON_VALUE
      ? `The connection fee for your ${priceText} including GST, which will appear on your first bill. A technician will require clear access to the main switch and/or meter. Please ensure there are no access restrictions such as locked gates and unrestrained animals as you may be charged additional fees if the provider incurs additional costs.`
      : `The connection fee for your ${priceText} including GST, which will appear on your first bill. As the power is off at the new property, a visual inspection is required on the day of connection. An adult over the age of 18 will have to be present on site between 7am-6pm. A technician will require clear access to the main switch. Please ensure there are no access restrictions such as locked gates and unrestrained animals as you may be charged additional fees if the provider incurs additional costs.`

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

interface EANewConnectionACTProps {
  control: Control
  awarePowerOff: string
  electricPrice: number | null
  gasPrice: number | null
}

export default EANewConnectionACT
