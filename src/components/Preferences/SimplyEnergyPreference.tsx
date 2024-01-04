import AccordionCard from '../AccordionCard'
import { useRegistration } from '../../hooks/useRegistration'
import TextNote from '../TextNote'
import { Typography } from '@material-tailwind/react'

const SimplyEnergyPreference = () => {
  const {registrationData} = useRegistration()
  const word = registrationData?.billType ?? ''
  return (

    <AccordionCard alwaysOpen open title="Simply Energy Preferences" bodyClassName="flex-col text-left gap-y-6">
      <Typography className='text-sm'>
        {`You have selected you want to receive your bills and other notices via ${word}`}
      </Typography>
      <TextNote className='text-sm'>
        {`You can change the method you receive your bills anytime by contacing customer service. By switching to receive your bills via ${word}, you will be charged a fee of $1.65 including GST.`}
      </TextNote>
    </AccordionCard>
  )
}

export default SimplyEnergyPreference
