import TextNote from './TextNote'
import MiniPlanCard from './MiniPlanCard'
import { Checkbox } from '@material-tailwind/react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

const FullPlanCard = ({ planName, brandIconSrc, energyType, termAndConditions, register }: FullPlanCardProps) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="p-6">
        <MiniPlanCard brandIcon={brandIconSrc} energyType={energyType} planName={planName} />
      </div>
      <TextNote>
        <div dangerouslySetInnerHTML={{ __html: termAndConditions }}></div>
      </TextNote>
      <div className="hidden">
        <Checkbox
          type="checkbox"
          label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
          {...register(`accept${energyType}TC1`)}
          crossOrigin=""
        />
        <Checkbox
          type="checkbox"
          label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
          {...register(`accept${energyType}TC2`)}
          crossOrigin=""
        />
      </div>
    </div>
  )
}

interface FullPlanCardProps {
  planName: string
  brandIconSrc: string
  energyType: string
  termAndConditions: string
  register: UseFormRegister<FieldValues>
}

export default FullPlanCard
