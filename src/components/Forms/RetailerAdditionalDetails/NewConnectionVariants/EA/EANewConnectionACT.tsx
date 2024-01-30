import { Control } from 'react-hook-form'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'
import { OFF_VALUE, ON_VALUE } from '../../../../../constants'

const OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: OFF_VALUE },
]

const EANewConnectionACT = ({ control, powerAware, powerOnText, electricPrice, gasPrice }: EANewConnectionACTProps) => {
  const priceText = `${electricPrice ? `electricity is ${electricPrice ?? '$0'}` : ''} ${
    electricPrice && gasPrice ? 'and' : ''
  } ${gasPrice ? `gas is ${gasPrice ?? '$0'}` : ''}`

  const powerOffText = `The connection fee for your ${priceText}, which will appear on your first bill. As the power is off at the new property, a visual inspection is required on the day of connection. An adult over the age of 18 will have to be present on site between 7am-6pm. A technician will require clear access to the main switch. Please ensure there are no access restrictions such as locked gates and unrestrained animals as you may be charged additional fees if the provider incurs additional costs.`

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
interface EANewConnectionACTProps {
  control: Control
  powerAware: string
  powerOnText: string
  electricPrice?: string | null
  gasPrice?: string | null
}

export default EANewConnectionACT
