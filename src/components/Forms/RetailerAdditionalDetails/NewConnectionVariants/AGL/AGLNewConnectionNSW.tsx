import { Control } from 'react-hook-form'
import { YES_NO_OPTIONS } from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'
import { formatCurrency } from '../../../../../helpers/formatter'

const AGLNewConnectionNSW = ({ control, hasPower, connectionPrice }: AGLNewConnectionNSWProps) => {
  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Is the power on at the new property?"
        control={control}
        name="hasPower"
        options={YES_NO_OPTIONS}
      />
      {/* Case power connected */}
      {hasPower ? (
        <TextNote>
          For your reading to occur there will need to be clear access to the meter and main switch between 7AM and
          10PM. (eg, no overgrown bushes, locked gate, locked meter, make sure your dog is locked away etc.) Please be
          aware that your reading may occur remotely.
        </TextNote>
      ) : null}

      {/* Case power NOT connected */}
      {!hasPower ? (
        <>
          <TextNote>
            If the power is disconnected, an adult must be on-site for the reconnection to occur. Please ensure your
            main
            <br />
            switch is left in the off position, or your connection may not occur. For your connection/reading to occur
            there will need to be clear access to the meter.
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

interface AGLNewConnectionNSWProps {
  control: Control
  hasPower: boolean
  connectionPrice: number | null
}

export default AGLNewConnectionNSW
