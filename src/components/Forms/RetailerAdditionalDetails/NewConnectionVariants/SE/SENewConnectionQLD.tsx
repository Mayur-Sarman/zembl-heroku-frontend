import { Control } from 'react-hook-form'
import { OFF_VALUE, ON_VALUE } from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'

const OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: OFF_VALUE },
]

const SENewConnectionQLD = ({ control, priceText, powerAware }: SENewConnectionQLDProps) => {
  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Are you aware if the power is on or off at the property?"
        control={control}
        name="newConnection.powerAware"
        options={OPTIONS}
        required
      />

      {/* Case power connected */}
      {powerAware === ON_VALUE ? (
        <TextNote>
          If the electricity is on, you can continue to use it. If the electricity is off, you must ensure the main
          switch is in the off position prior to the connection date. Please note that if a site visit is required,
          clear and safe access to the meter will be required on the date requested. If access to your meter is not
          provided on that day, a second visit may be required and this will incur additional charges. The cost for your
          move-in will be {priceText}.
        </TextNote>
      ) : null}

      {powerAware === OFF_VALUE ? (
        <TextNote>
          If the electricity is off, you must ensure the main switch is in the off position prior to the connection
          date. Please note that if a site visit is required, clear and safe access to the meter will be required on the
          date requested. If access to your meter is not provided on that day, a second visit may be required and this
          will incur additional charges.
          <br />
          <br />
          Energex may be required to perform a visual examination of the property, and the energisation can only be
          completed during the day. Also if personal items are at the property, the owner or someone over the age of 18
          needs to be there.
          <br />
          <br />
          Please make sure there is clear access to the electricity and gas meters. If the meter can&apos;t be accessed
          a second visit may be required and this will incur additional charges. The cost for your move-in will be{' '}
          {priceText}.
        </TextNote>
      ) : null}
    </AccordionCard>
  )
}

interface SENewConnectionQLDProps {
  priceText: string
  control: Control
  powerAware: string
}

export default SENewConnectionQLD
