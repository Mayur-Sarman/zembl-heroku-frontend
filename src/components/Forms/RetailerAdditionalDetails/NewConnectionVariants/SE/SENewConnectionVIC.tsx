import { Control } from 'react-hook-form'
import { OFF_VALUE, ON_VALUE } from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'

const OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: OFF_VALUE },
]

const SENewConnectionVIC = ({ priceText, control, powerAware }: SENewConnectionVICProps) => {
  const powerNote =
    powerAware === ON_VALUE ? (
      <div className="flex flex-col gap-6">
        <span>
          If the electricity is on, you can continue to use it. If the electricity is off, you must ensure the main
          switch is in the off position prior to the connection date. Please note that if a site visit is required,
          clear and safe access to the meter will be required on the date requested. If access to your meter is not
          provided on that day, a second visit may be required and this will incur additional charges. We&apos;ll
          request that your electricity is connected remotely.
        </span>
        <span>
          This means that a technician may not need to visit your property to connect the power. There are electrical
          safety risks associated with remote connection. Please ensure that between today and the date you have
          requested for re-energization that no works are undertaken at the property with exposed wiring. The cost for
          your move-in will be {priceText}.
        </span>
      </div>
    ) : (
      `If the electricity is off, you must ensure the main switch is in the off position prior to the connection date. Please note that if a site visit is required, clear and safe access to the meter will be required on the date requested. If access to your meter is not provided on that day, a second visit may be required and this will incur additional charges. Please make sure there is clear access to the electricity and gas meters. If the meter can't be accessed a second visit may be required and this will incur additional charges. The cost for your move-in will be ${priceText}.`
    )

  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Are you aware if the power is on or off at the property?"
        control={control}
        name="newConnection.powerAware"
        options={OPTIONS}
      />

      {powerAware ? <TextNote>{powerNote}</TextNote> : null}
    </AccordionCard>
  )
}

interface SENewConnectionVICProps {
  priceText: string
  control: Control
  powerAware: string
}

export default SENewConnectionVIC
