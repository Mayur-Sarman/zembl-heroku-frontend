import { Control } from 'react-hook-form'
import { INSTALLLATION_TIMESLOT_OPTIONS, OFF_VALUE, ON_VALUE } from '../../../../../constants'
import { formatCurrency } from '../../../../../helpers/formatter'
import AccordionCard from '../../../../AccordionCard'
import ControllerRadioGroupInput from '../../../../Inputs/ControllerRadioGroupInput'
import TextNote from '../../../../TextNote'

const OPTIONS = [
  { value: ON_VALUE, label: ON_VALUE },
  { value: OFF_VALUE, label: OFF_VALUE },
]

const SENewConnectionQLD = ({ electricPrice, gasPrice, control, powerAware }: SENewConnectionQLDProps) => {
  const priceText = `${electricPrice ? `${formatCurrency(electricPrice)} for electricity` : ''} ${
    electricPrice && gasPrice ? 'and' : 'or'
  } ${gasPrice ? `${formatCurrency(gasPrice)} for gas` : ''}`

  //   const powerNote =
  //     powerAware === OFF_VALUE
  //       ? 'If the electricity is off, you must ensure the main switch is in the off position prior to the connection date.'
  //       : 'If the electricity is on, you can continue to use it. '

  return (
    <AccordionCard open alwaysOpen title="New Connection" bodyClassName="w-full flex flex-col gap-6 text-left">
      <ControllerRadioGroupInput
        label="Are you aware if the power is on or off at the property?"
        control={control}
        name="powerAware"
        options={OPTIONS}
        required
      />

      {/* Case power connected */}
      {powerAware === ON_VALUE ? (
        <TextNote>
          Please note that if a site visit is required, clear and safe access to the meter will be required on the date
          requested. If access to your meter is not provided on that day, a second visit may be required, and this will
          incur additional charges. If the electricity is on, you can continue to use it. The cost for your move-in will
          be {priceText}
        </TextNote>
      ) : (
        <ControllerRadioGroupInput
          label={`If the electricity is off, you must ensure the main switch is in the off position prior to the connection date. The cost for your move-in will be ${priceText}. Energex may be required to perform a visual examination of the property, and the energisation can only be completed during the day.  Also, if personal items are at the property, the owner or someone over the age of 18 needs to be there.`}
          control={control}
          name="timeslot"
          options={INSTALLLATION_TIMESLOT_OPTIONS}
          required
        />
      )}
    </AccordionCard>
  )
}

interface SENewConnectionQLDProps {
  electricPrice: number
  gasPrice: number
  control: Control
  powerAware: string
}

export default SENewConnectionQLD

//<ControllerRadioGroupInput
//     label="Are you aware if the power is on or off at the property?"
//     control={control}
//     name="powerAware"
//     options={OPTIONS}
//     required
//   />
//   {powerAware === ON_VALUE ? (
//     <TextNote>
//       If the electricity is on, you can continue to use it. If the electricity is off, you must ensure the main
//       switch is in the off position prior to the connection date. Please note that if a site visit is required,
//       clear and safe access to the meter will be required on the date requested. If access to your meter is not
//       provided on that day, a second visit may be required and this will incur additional charges. The cost for your
//       move-in will be ${priceText}.
//     </TextNote>
//   ) : (
//     <>
//       <TextNote>
//         If the electricity is off, you must ensure the main switch is in the off position prior to the connection
//         date. Please note that if a site visit is required, clear and safe access to the meter will be required on
//         the date requested. If access to your meter is not provided on that day, a second visit may be required and
//         this will incur additional charges.
//       </TextNote>
//       <TextNote>
//         Energex may be required to perform a visual examination of the property, and the energisation can only be
//         completed during the day. Also if personal items are at the property, the owner or someone over the age of
//         18 needs to be there.
//       </TextNote>
//       <TextNote>
//         Please make sure there is clear access to the electricity and gas meters. If the meter can't be accessed a
//         second visit may be required and this will incur additional charges. The cost for your move-in will be{' '}
//         {priceText}.
//       </TextNote>
//     </>
//   )}
