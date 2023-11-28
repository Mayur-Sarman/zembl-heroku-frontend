// import { Control } from 'react-hook-form'
import AccordionCard from '../AccordionCard'
import { useRegistration } from '../../hooks/useRegistration'
// import ControllerSelectInput from '../Inputs/ControllerSelectInput'
// import { SIMPLY_ENERGY_OPTIONS } from '../../constants'
import TextNote from '../TextNote'
import { Typography } from '@material-tailwind/react'

const SimplyEnergyPreference = () => {
  const {registrationData} = useRegistration()
  const word = registrationData?.billType ?? ''
  return (

    <AccordionCard alwaysOpen open title="Simply Energy Preferences" bodyClassName="flex-col text-left gap-y-6">

      {/* <ControllerSelectInput
          control={control}
          name={`${prefix}.greenPowerOption`}
          label={`You have selected you want to receive your bills and other notices via ${word}`}
          textLabel={`You have selected you want to receive your bills and other notices via ${word}`}
          placeholder="Select..."
          options={SIMPLY_ENERGY_OPTIONS}
          required
        /> */}
      <Typography>
        {`You have selected you want to receive your bills and other notices via ${word}`}
      </Typography>
      <TextNote>
        {`By receiving your bills via ${word} you will be charged a fee of $1.65 including GST. You can change the method you receive your bills anytime by contacting customer service.`}
      </TextNote>
    </AccordionCard>
  )
}

// interface SimplyEnergyPreferenceProps {
//   control: Control
//   siteAddress?: string
//   prefix: string
//   pref?: Record<string, string>
// }

export default SimplyEnergyPreference
