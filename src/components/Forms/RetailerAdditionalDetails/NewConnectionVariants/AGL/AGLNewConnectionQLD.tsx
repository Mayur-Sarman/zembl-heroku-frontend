import { Control } from 'react-hook-form'
import { HOME_OR_PROVIDE_KEYS_OPTIONS, INSTALLLATION_TIMESLOT_OPTIONS, YES_NO_OPTIONS } from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'
import { formatCurrency } from '../../../../../helpers/formatter'

const AGLNewConnectionQLD = ({ control, hasPower, connectionPrice }: AGLNewConnectionQLDProps) => {
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
        <>
          <TextNote>
            For your reading to occur there will need to be clear access to the meter and main switch between 7AM and
            10PM. (eg, no overgrown bushes, locked gate, locked meter, make sure your dog is locked away etc.) Please be
            aware that your reading may occur remotely.
          </TextNote>
          <TextNote>
            The distributor will need to gain access to the inside of your property to complete a visual inspection.
            Someone over the age of 18 will need to be present at the premises, or a key must be left at the property if
            it is completely vacant.
          </TextNote>
          <ControllerRadioGroupInput
            label="Which time would you prefer the distributor to come to your property to complete the visual inspection? 8am - 1 pm or 1pm - 6pm?"
            control={control}
            name="preferredTimeslot"
            options={INSTALLLATION_TIMESLOT_OPTIONS}
          />
          <ControllerRadioGroupInput
            label="Will you be home, or will a key be left in the letter box?"
            control={control}
            name="isVacant"
            options={HOME_OR_PROVIDE_KEYS_OPTIONS}
          />
        </>
      ) : null}

      {/* Case power NOT connected */}
      {!hasPower ? (
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

interface AGLNewConnectionQLDProps {
  control: Control
  hasPower: boolean
  connectionPrice: number | null
}

export default AGLNewConnectionQLD
