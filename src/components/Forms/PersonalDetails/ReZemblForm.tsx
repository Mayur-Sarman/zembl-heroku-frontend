import AccordionCard from '../../AccordionCard'
import { Typography } from '@material-tailwind/react'
import { Control, Controller } from 'react-hook-form'
import { YES_NO_OPTIONS } from '../../../constants'
import RadioGroupInput from '../../Inputs/RadioGroupInput'

const ReZemblForm = ({ control }: ReZemblFormProps) => {
  return (
    <AccordionCard title="Re-Zembl" alwaysOpen open bodyClassName="w-full flex flex-col gap-3 text-left">
      <div className="flex flex-col gap-y-4 bg-zembl-s1 p-4 rounded-md border">
        <Typography variant="h6">Like to save time down the line? Re-Zembl is how.</Typography>
        <Typography>Re-Zembl is our free auto-renewal service for your energycontract.</Typography>
        <Typography>
          As your 2-year anniversary approaches, we’ll automatically source a new competitive energy offer from our
          panel of retailers.
        </Typography>
        <Typography>
          It’ll keep your rates competitive and save you time arranging energy deals over and over. You can cancel at
          any time.
        </Typography>
        <ul className='list-disc px-6'>
          <li>Keeps rates competitive</li>
          <li>Saves time & hassle</li>
          <li>Free Zembl service</li>
          <li>Cancel at any time</li>
        </ul>
      </div>

      <div className="w-full flex flex-col gap-3 text-left">
        <Controller
          control={control}
          name="reZembl"
          render={({ field }) => (
            <RadioGroupInput
              {...field}
              label="Register for Re-Zembl?"
              values={[field.value]}
              options={YES_NO_OPTIONS}
            />
          )}
        />
      </div>
    </AccordionCard>
  )
}

interface ReZemblFormProps {
  control: Control
}

export default ReZemblForm
