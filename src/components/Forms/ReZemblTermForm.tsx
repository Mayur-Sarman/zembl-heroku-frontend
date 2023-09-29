import AccordionCard from '../AccordionCard'

import zemblLogo from '../../assets/zembl-icon.svg'
import TextNote from '../TextNote'
import RichText from '../RichText'
import { Checkbox, Typography } from '@material-tailwind/react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

const ReZemblTermForm = ({
  zemblElectricTerms = '<div>Test Electric</div>',
  zemblGasTerms = '<div>Test Gas</div>',
  register,
}: ReZemblTermFormProps) => {
  const electricTermDisplay = zemblElectricTerms ? (
    <TextNote>
      <RichText htmlString={zemblElectricTerms} />
    </TextNote>
  ) : null

  const gasTermDisplay = zemblGasTerms ? (
    <TextNote>
      <RichText htmlString={zemblGasTerms} />
    </TextNote>
  ) : null

  return (
    <AccordionCard open alwaysOpen title="Your Acknowledge and Acceptance">
      <div className="grid grid-cols-1 gap-6 text-left">
        <div className="flex gap-6 items-center">
          <img src={zemblLogo} alt="Zembl Icon" className="w-16 h-16" />
          <Typography variant="h3" className="font-semibold text-zembl-p">
            Re-Zembl
          </Typography>
        </div>
        {electricTermDisplay}
        <Checkbox
          label={`By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms`}
          labelProps={{ className: `font-semibold after:content-['*'] after:text-red-500 after:ml-1` }}
          required
          {...register('acceptElectricReZemblTerm')}
          crossOrigin={''}
        />
        {gasTermDisplay}
        <Checkbox
          label={`By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms`}
          labelProps={{ className: `font-semibold after:content-['*'] after:text-red-500 after:ml-1` }}
          required
          {...register('acceptGasReZemblTerm')}
          crossOrigin={''}
        />
      </div>
    </AccordionCard>
  )
}

interface ReZemblTermFormProps {
  zemblElectricTerms?: string | null
  zemblGasTerms?: string | null
  register: UseFormRegister<FieldValues>
}

export default ReZemblTermForm
