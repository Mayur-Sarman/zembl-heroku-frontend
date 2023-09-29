import TextNote from './TextNote'
import MiniPlanCard from './MiniPlanCard'
import { Control } from 'react-hook-form'
import RichText from './RichText'
import ControllerCheckBox from './Inputs/ControllerCheckBox'

const FullPlanCard = ({ planName, brandIconSrc, energyType, termAndConditions, control }: FullPlanCardProps) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="p-2 md:p-6">
        <MiniPlanCard brandIcon={brandIconSrc} energyType={energyType} planName={planName} />
      </div>
      <TextNote>
        <RichText htmlString={termAndConditions} />
      </TextNote>
      <ControllerCheckBox
        name={`accept${energyType}TC1`}
        control={control}
        required
        label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
      />
      <ControllerCheckBox
        name={`accept${energyType}TC1`}
        control={control}
        required
        label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
      />
    </div>
  )
}

interface FullPlanCardProps {
  planName: string
  brandIconSrc: string
  energyType: string
  termAndConditions: string
  control: Control
}

export default FullPlanCard
