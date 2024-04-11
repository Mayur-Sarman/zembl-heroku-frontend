import AccordionCard from '../AccordionCard'
import { useRegistration } from '../../hooks/useRegistration'
import TextNote from '../TextNote'
import { Typography } from '@material-tailwind/react'

const SimplyEnergyPreference = () => {
  const {registrationData} = useRegistration()
  const word = registrationData?.billType ?? ''
  const concessionCardNumber = registrationData?.concessionCardNumber
  return (
    <AccordionCard alwaysOpen open title="ENGIE Preferences" bodyClassName="flex-col text-left gap-y-6">
      <Typography className='text-sm'>
        {`You have selected you want to receive your bills and other notices via ${word}`}
      </Typography>
      { word === 'Post' && (!concessionCardNumber || !registrationData.fullAddress?.includes('NSW')) ?
        <TextNote className='text-sm'>
        {`By receiving your bills via post you will be charged a fee of $1.65 including GST. You can change the method you receive your bills anytime by contacting customer service.`}
      </TextNote>
      : null
      }
      
    </AccordionCard>
  )
}

export default SimplyEnergyPreference
