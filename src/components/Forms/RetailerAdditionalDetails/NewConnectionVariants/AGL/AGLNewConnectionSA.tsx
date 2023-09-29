import { Control } from 'react-hook-form'
import { CONNECTED, DISCONNECTED, YES_NO_OPTIONS } from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'
import { formatCurrency } from '../../../../../helpers/formatter'

const AGLNewConnectionSA = ({ control, hasPower, connectionPrice }: AGLNewConnectionSAProps) => {
  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Is the power on at the new property?"
        control={control}
        name="hasPower"
        options={YES_NO_OPTIONS}
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
          <TextNote>
            On the date of connection, you will need to ensure you make the necessary arrangements for the Main Power
            Switch to be set to the OFF position before 7am on the day of connection. If the Main Power Switch is not
            set to the off position the distributor will not connect the power due to Health and Safety Reasons so,
            please ensure that this is done. You do not have to be home.
          </TextNote>
          <TextNote className="text-blue-500">
            If you have a digital meter, please be aware that your reconnection may occur remotely and that the main
            switch will need to be off between 7am and 10pm.
          </TextNote>
          <TextNote className="text-green-500">
            Your connection fee will be {formatCurrency(connectionPrice)} including GST.
          </TextNote>
        </>
      ) : null}
    </AccordionCard>
  )
}

interface AGLNewConnectionSAProps {
  control: Control
  hasPower: string
  connectionPrice: number | null
}

export default AGLNewConnectionSA
