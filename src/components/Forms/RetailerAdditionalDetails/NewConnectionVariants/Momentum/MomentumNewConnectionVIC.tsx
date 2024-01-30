import { Control } from 'react-hook-form'
import { OFF_VALUE, ON_VALUE, UNSURE_VALUE, YES_NO_OPTIONS } from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'

const OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: OFF_VALUE },
  { value: UNSURE_VALUE, label: UNSURE_VALUE },
]

const MomentumNewConnectionVIC = ({ connectionPrice, control, powerAware }: MomentumNewConnectionVICProps) => {
  const priceText = `The standard new connection fee is up to ${connectionPrice ?? '$0'} including GST`

  let powerNote = null
  switch (powerAware) {
    case ON_VALUE:
      powerNote = (
        <div className="flex flex-col gap-6">
          <TextNote>
            Your network has up to 4 business days from the date of the service order to attend the site and read your
            meter. Momentum starts billing from the date of this read. Make sure there’s clear and safe access to your
            meter or it could mean extra fees and/or a delayed connection or transfer.
          </TextNote>
          To your knowledge, from the date the power was (or will be) disconnected to the proposed date of
          re-connection, are there any works at these premises which might put someone in contact with exposed wiring?`
        </div>
      )
      break
    case OFF_VALUE:
      powerNote = `Make sure your main switch is in the off position, and there’s clear and safe access to your meter or it could mean extra fees and/or a delayed connection or transfer. To your knowledge, from the date the power was (or will be) disconnected to the proposed date of re-connection, are there any works at these premises which might put someone in contact with exposed wiring?`
      break
    case UNSURE_VALUE:
      powerNote = (
        <div className="flex flex-col gap-6">
          <TextNote>
            If the power’s off, make sure your main switch is in the off position. If the power’s on, your network has 4
            business days from the date of the service order to read your meter onsite. Momentum starts billing from
            this read date. Make sure there’s clear and safe access to your meter or it could mean extra fees and/or a
            delayed connection or transfer.
          </TextNote>
          To your knowledge, from the date the power was (or will be) disconnected to the proposed date of
          re-connection, are there any works at these premises which might put someone in contact with exposed wiring?
        </div>
      )
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
      {powerAware && (
        <ControllerRadioGroupInput
          label={powerNote}
          control={control}
          name="newConnection.workAtPremises"
          options={YES_NO_OPTIONS}
        />
      )}
      <TextNote>{priceText}</TextNote>
    </AccordionCard>
  )
}

interface MomentumNewConnectionVICProps {
  connectionPrice?: string | null
  control: Control
  powerAware: string
}

export default MomentumNewConnectionVIC
