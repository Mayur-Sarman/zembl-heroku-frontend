import { Control } from 'react-hook-form'
import {
  CONNECTED,
  DISCONNECTED,
  INSTALLLATION_TIMESLOT_OPTIONS,
  YES_NO_OPTIONS,
  YES_VALUE,
} from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'
import { formatDateTime } from '../../../../../helpers/formatter'

const HAS_CONNECTION_OPTIONS = YES_NO_OPTIONS.map((opt) => ({
  ...opt,
  label: opt.value === YES_VALUE ? CONNECTED : DISCONNECTED,
}))

const BlueNRGNewConnectionQLD = ({
  connectionDate,
  hasPower,
  control,
  businessHoursFee,
  nonBusinessHoursFee,
}: BlueNRGNewConnectionQLDProps) => {
  const powerOn = hasPower === YES_VALUE
  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Is power on at the property?"
        control={control}
        name={'newConnection.powerConnected'}
        options={HAS_CONNECTION_OPTIONS}
      />
      {powerOn ? (
        <>
          <TextNote>
            We will raise a connection request for your site on{' '}
            {connectionDate ? formatDateTime(connectionDate) : 'N/A'}. Please be aware that your reconnection may occur
            remotely and that the main switch will need to be off between 7am and 10pm.
          </TextNote>
          <ControllerRadioGroupInput
            label="Energex requires a 5-hour timeframe window to do a visual safety inspection to your new property. The examination requires full access to all buildings on the premises, including all electrical points inside the premises and any shed or a garage. Energex requires someone over the age of 18 to be present for this timeframe. The time frames for a visual inspection are 8am to 1pm, and 1pm to 6pm. Which would you prefer?” "
            control={control}
            name={'newConnection.inspectionTimeslot'}
            options={INSTALLLATION_TIMESLOT_OPTIONS}
          />
        </>
      ) : (
        <TextNote>
          Failure to provide clear access to your meter may result in additional fees and/or a delay to your connection
          or transfer to Blue NRG. If you choose to terminate your contract during the cooling-off period, you may incur
          and be required to pay for any usage and any pass-through costs associated with your reconnection. Move in
          fees are {businessHoursFee} including GST for connections during business hours and {nonBusinessHoursFee}{' '}
          including GST for connections outside business hours.
        </TextNote>
      )}
    </AccordionCard>
  )
}

interface BlueNRGNewConnectionQLDProps {
  control: Control
  connectionDate: Date | null
  hasPower?: string
  businessHoursFee: number | null
  nonBusinessHoursFee: number | null
}

export default BlueNRGNewConnectionQLD
