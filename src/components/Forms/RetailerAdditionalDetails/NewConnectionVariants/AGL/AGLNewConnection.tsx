import { Control } from 'react-hook-form'
import {
  CONNECTED,
  DISCONNECTED,
  HOME_OR_PROVIDE_KEYS_OPTIONS,
  INSTALLLATION_TIMESLOT_OPTIONS,
  NO_VALUE,
  NSW_VALUE,
  QLD_VALUE,
  SA_VALUE,
  VIC_VALUE,
  YES_NO_OPTIONS,
  YES_UNSURE,
  YES_VALUE,
} from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'
import { formatCurrency } from '../../../../../helpers/formatter'

const HAS_CONNECTION_OPTIONS = YES_NO_OPTIONS.map((opt) => ({
  ...opt,
  label: opt.value === YES_VALUE ? CONNECTED : DISCONNECTED,
}))

const YES_UNSURE_OPTIONS = YES_NO_OPTIONS.map((opt) => ({
  ...opt,
  label: opt.value === YES_VALUE ? YES_UNSURE : opt.value,
}))

const AGLNewConnection = ({
  control,
  hasPower,
  hasAnyWorkCompleted,
  connectionPrice,
  state,
}: AGLNewConnectionProps) => {
  const powerOn = hasPower === YES_VALUE
  const connectionPriceDisplay = (
    <TextNote>Your connection fee will be {formatCurrency(connectionPrice)} including GST.</TextNote>
  )
  const digitalMeterNote = (
    <TextNote>
      If you have a digital meter, please be aware that your reconnection may occur remotely and that the main switch
      will need to be off between 7am and 10pm.
    </TextNote>
  )

  let stateVaryDisplay = null
  switch (state) {
    case VIC_VALUE.shortName:
      stateVaryDisplay = (
        <>
          <ControllerRadioGroupInput
            label="Has there or will there be any work completed at the property that may lead to contact with the wires since the power was disconnected?"
            control={control}
            name="newConnection.anyWorkCompletedSinceDisconnected"
            options={YES_UNSURE_OPTIONS}
          />
          {hasAnyWorkCompleted === NO_VALUE ? (
            <TextNote>
              Please be aware that your reconnection may occur remotely and that the main switch will need to be off
              between 7am and 10pm.
            </TextNote>
          ) : null}
          {connectionPriceDisplay}
        </>
      )
      break

    case NSW_VALUE.shortName:
      stateVaryDisplay = (
        <>
          <TextNote>
            If the power is disconnected, an adult must be on-site for the reconnection to occur. Please ensure your
            main
            <br />
            switch is left in the off position, or your connection may not occur. For your connection/reading to occur
            there will need to be clear access to the meter.
          </TextNote>
          {digitalMeterNote}
          {connectionPriceDisplay}
        </>
      )
      break

    case SA_VALUE.shortName:
      stateVaryDisplay = (
        <>
          <TextNote>
            On the date of connection, you will need to ensure you make the necessary arrangements for the Main Power
            Switch to be set to the OFF position before 7am on the day of connection. If the Main Power Switch is not
            set to the off position the distributor will not connect the power due to Health and Safety Reasons so,
            please ensure that this is done. You do not have to be home.
          </TextNote>
          {digitalMeterNote}
          {connectionPriceDisplay}
        </>
      )
      break

    case QLD_VALUE.shortName:
      stateVaryDisplay = (
        <>
          <ControllerRadioGroupInput
            label="Which time would you prefer the distributor to come to your property to complete the visual inspection? 8am - 1 pm or 1pm - 6pm?"
            control={control}
            name="newConnection.inspectionTimeslot"
            options={INSTALLLATION_TIMESLOT_OPTIONS}
          />
          <ControllerRadioGroupInput
            label="Will you be home, or will a key be left in the letter box?"
            control={control}
            name="newConnection.accessMethod"
            options={HOME_OR_PROVIDE_KEYS_OPTIONS}
          />
        </>
      )
  }
  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Is the power on at the new property?"
        control={control}
        name="newConnection.powerConnected"
        options={HAS_CONNECTION_OPTIONS}
      />
      {/* Case power connected */}
      {powerOn ? (
        <TextNote>
          For your reading to occur there will need to be clear access to the meter and main switch between 7AM and
          10PM. (eg, no overgrown bushes, locked gate, locked meter, make sure your dog is locked away etc.) Please be
          aware that your reading may occur remotely.
        </TextNote>
      ) : null}

      {/* Case power NOT connected */}
      {hasPower && !powerOn ? stateVaryDisplay : null}
    </AccordionCard>
  )
}

interface AGLNewConnectionProps {
  control: Control
  hasPower: string
  hasAnyWorkCompleted: string
  connectionPrice?: number | null
  state: string
}

export default AGLNewConnection
