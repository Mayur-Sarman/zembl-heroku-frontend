import { Control } from 'react-hook-form'
import { CONNECTED, DISCONNECTED, HAS_CONNECTION_OPTIONS, NO_VALUE, YES_UNSURE_OPTIONS } from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'
import { formatCurrency } from '../../../../../helpers/formatter'

const AGLNewConnectionVIC = ({ control, hasPower, hasAnyWorkCompleted, connectionPrice }: AGLNewConnectionVICProps) => {
  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Is the power on at the new property?"
        control={control}
        name="hasPower"
        options={HAS_CONNECTION_OPTIONS}
      />
      {/* Case power connected */}
      {hasPower === CONNECTED ? (
        <TextNote>
          For your reading to occur there will need to be clear access to the meter and main switch between 7AM and
          10PM. (eg, no overgrown bushes, locked gate, locked meter, make sure your dog is locked away etc.) Please be
          aware that your reading may occur remotely.
        </TextNote>
      ) : null}

      {/* Case power NOT connected */}
      {hasPower === DISCONNECTED ? (
        <>
          <ControllerRadioGroupInput
            label="Has there or will there be any work completed at the property that may lead to contact with the wires since the power was disconnected?"
            control={control}
            name="hasAnyWorkCompleted"
            options={YES_UNSURE_OPTIONS}
          />
          {hasAnyWorkCompleted === NO_VALUE ? (
            <TextNote>
              Please be aware that your reconnection may occur remotely and that the main switch will need to be off
              between 7am and 10pm.
            </TextNote>
          ) : null}
          <TextNote className="text-green-500">
            Your connection fee will be {formatCurrency(connectionPrice)} including GST.
          </TextNote>
        </>
      ) : null}
    </AccordionCard>
  )
}

interface AGLNewConnectionVICProps {
  control: Control
  hasPower: string
  hasAnyWorkCompleted: string
  connectionPrice: number | null
}

export default AGLNewConnectionVIC
