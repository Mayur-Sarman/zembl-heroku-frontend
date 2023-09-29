import AccordionCard from '../AccordionCard'

import zemblLogo from '../../assets/zembl-icon.svg'
import TextNote from '../TextNote'
import RichText from '../RichText'
import { Checkbox, Typography } from '@material-tailwind/react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

const ReZemblTermForm = ({ zemblTerms, register }: ReZemblTermFormProps) => {
  return (
    <AccordionCard open alwaysOpen title="Your Acknowledge and Acceptance">
      <div className="grid grid-cols-1 gap-6 text-left">
        <div className="flex gap-6 items-center">
          <img src={zemblLogo} alt="Zembl Icon" className="w-16 h-16" />
          <Typography variant="h3" className="font-semibold text-zembl-p">
            Re-Zembl
          </Typography>
        </div>
        <TextNote>
          <RichText htmlString={zemblTerms} />
        </TextNote>
        <Checkbox
          label={`By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms`}
          labelProps={{ className: `font-semibold after:content-['*'] after:text-red-500 after:ml-1` }}
          required
          {...register('acceptReZemblTerms')}
          crossOrigin={''}
        />
      </div>
    </AccordionCard>
  )
}

interface ReZemblTermFormProps {
  zemblTerms: string
  register: UseFormRegister<FieldValues>
}

export default ReZemblTermForm
