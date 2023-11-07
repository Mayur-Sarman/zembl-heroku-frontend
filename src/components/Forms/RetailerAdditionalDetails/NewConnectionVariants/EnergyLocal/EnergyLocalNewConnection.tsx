import { Control } from 'react-hook-form'
import { YES_NO_OPTIONS, YES_VALUE } from '../../../../../constants'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'
import { formatCurrency } from '../../../../../helpers/formatter'
import ControllerTextArea from '../../../../Inputs/ControllerTextArea'

const EnergyLocalNewConnection = ({ control, electricalRenovationWork, connectionPrice }: EnergyLocalNewConnectionProps) => {
  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Has there or will there be any work completed at the property that may lead to contact with the wires since the power was disconnected?"
        control={control}
        name="newConnection.electricalRenovationWork"
        options={YES_NO_OPTIONS}
      />
      {/* Case power connected */}
      {electricalRenovationWork === YES_VALUE ? (
        <ControllerTextArea
          name="newConnection.ongoingWork"
          control={control}
          label="Please describe the works being completed at the premises."
          required={electricalRenovationWork === YES_VALUE}
        />
      ) : null}

      <TextNote className="text-green-500">
        A standard move in reconnection fee of {formatCurrency(connectionPrice)} inc GST will apply and the fee for this
        will be passed through to you directly from the distributor on your first bill.
      </TextNote>
    </AccordionCard>
  )
}

interface EnergyLocalNewConnectionProps {
  control: Control
  electricalRenovationWork?: string
  connectionPrice: number | null
}

export default EnergyLocalNewConnection
