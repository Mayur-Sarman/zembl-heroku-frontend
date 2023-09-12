import { Typography } from '@material-tailwind/react'
import AccordionCard from '../AccordionCard'
import TextNote from '../TextNote'

const SimplyEnergyPreference = () => {
  return (
    <AccordionCard alwaysOpen open title="Simply Energy Preferences" bodyClassName="flex-col text-left gap-y-6">
      <Typography>You have selected you want to receive your bills and other notices via Email</Typography>
      <TextNote className='flex flex-col gap-y-6'>
        <Typography>
          You can change the method you receive your bills anytime by contacting customer service.{' '}
        </Typography>
        <Typography>
          By receiving your bills via post you will be charged a fee of $1.65 including GST. You can change the method
          you receive your bills anytime by contacting customer service.
        </Typography>
      </TextNote>
    </AccordionCard>
  )
}

export default SimplyEnergyPreference
