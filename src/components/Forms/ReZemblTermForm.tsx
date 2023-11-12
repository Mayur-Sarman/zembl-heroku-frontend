import AccordionCard from '../AccordionCard'

import zemblLogo from '../../assets/zembl-icon.svg'
import TextNote from '../TextNote'
import RichText from '../RichText'
import { Checkbox, Typography } from '@material-tailwind/react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Quote } from '../../api/quote'

const ReZemblTermForm = ({
  zemblElectric,
  zemblGas,
  register,
}: ReZemblTermFormProps) => {
  const electricTermDisplay = zemblElectric?.termAndConditionContent ? (
    <TextNote className={'break-all'}>
      <RichText htmlString={zemblElectric.termAndConditionContent} />
    </TextNote>
  ) : null

  const gasTermDisplay = zemblGas?.termAndConditionContent ? (
    <TextNote className={'break-all'}>
      <RichText htmlString={zemblGas.termAndConditionContent} />
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
        { zemblElectric?.quoteId != null ? 
          <>
            {electricTermDisplay}
            <Checkbox
              label={`By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms`}
              labelProps={{ className: `font-semibold after:content-['*'] after:text-red-500 after:ml-1` }}
              required
              {...register('acceptElectricReZemblTerm')}
              crossOrigin={''}/> 
          </>
        : null}
        
        {zemblGas?.quoteId != null ? 
          <>
            {gasTermDisplay}
            <Checkbox
              label={`By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms`}
              labelProps={{ className: `font-semibold after:content-['*'] after:text-red-500 after:ml-1` }}
              required
              {...register('acceptGasReZemblTerm')}
              crossOrigin={''}
            />
          </>
        : null}
      </div>
    </AccordionCard>
  )
}

interface ReZemblTermFormProps {
  zemblElectric?: Quote | null
  zemblGas?: Quote | null
  register: UseFormRegister<FieldValues>
}

export default ReZemblTermForm
