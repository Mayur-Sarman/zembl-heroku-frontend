import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'
import { Control } from 'react-hook-form'
import {
  INSPECTION_METHOD_OPTIONS,
  INSPECTION_METHOD_PERSON,
  INSTALLLATION_TIMESLOT_OPTIONS,
  OFF_VALUE,
  ON_VALUE,
} from '../../../../../constants'

const ON_OFF_OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: OFF_VALUE },
]

const EANewConnectionQLD = ({ control, powerAware, powerOnText, accessMethod }: AGLNewConnectionQLDProps) => {
  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Are you aware if the power is on or off at the property?"
        control={control}
        name="newConnection.powerAware"
        options={ON_OFF_OPTIONS}
      />
      {/* Case power connected */}
      {powerAware === ON_VALUE ? <TextNote>{powerOnText}</TextNote> : null}
      {powerAware === OFF_VALUE ? (
        <ControllerRadioGroupInput
          label="As the power is off at the property, a visual inspection is required. A person over the age of 18 will need to be present or a key may be left in the letter or meter box. Which would you prefer?"
          control={control}
          name="newConnection.accessMethod"
          options={INSPECTION_METHOD_OPTIONS}
        />
      ) : null}

      {powerAware === OFF_VALUE && accessMethod === INSPECTION_METHOD_PERSON ? (
        <ControllerRadioGroupInput
          label="You can choose any 5-hour period between 8am – 6pm. Please note, a fee will be charged by the distributor if the appointment is not kept. What time would be suitable for you?"
          control={control}
          name="newConnection.inspectionTimeslot"
          options={INSTALLLATION_TIMESLOT_OPTIONS}
        />
      ) : (
        <TextNote>
          The property will need to be completely empty for this option. If the keys are not left in the meter box /
          letter box, or access is restricted by a locked gate or unrestrained animal, a fee will be charged by the
          distributor.
        </TextNote>
      )}
    </AccordionCard>
  )
}

interface AGLNewConnectionQLDProps {
  control: Control
  powerAware: string
  accessMethod: string
  powerOnText: string
}

export default EANewConnectionQLD
