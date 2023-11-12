import TextNote from './TextNote'
import MiniPlanCard from './MiniPlanCard'
import { Control } from 'react-hook-form'
import RichText from './RichText'
import ControllerCheckBox from './Inputs/ControllerCheckBox'
import { TermAndCondition } from '../api/quote'
import { ELECTRICITY_VALUE } from '../constants'

const FullPlanCard = ({
  planName,
  brandIconSrc,
  energyType,
  termAndConditionContent,
  termAndConditionItems = [],
  control,
}: FullPlanCardProps) => {
  const prefix = energyType === ELECTRICITY_VALUE ? 'electricityQuote' : 'gasQuote'
  const termChecksDisplay = termAndConditionItems?.map((item, index) => (
    <ControllerCheckBox
      key={item.id}
      name={`${prefix}.[${index}].accepted`}
      control={control}
      required
      label={item.label ?? 'By checking this box I agree this is my \'Digital Signature\' and acceptance of all terms'}
    />
  ))
  return (
    <div className="grid grid-cols-1 gap-3 break-all">
      <div className="p-2 md:p-6">
        <MiniPlanCard brandIcon={brandIconSrc} energyType={energyType} planName={planName} />
      </div>
      {termAndConditionContent ? (
        <TextNote>
          <RichText htmlString={termAndConditionContent} />
        </TextNote>
      ) : null}

      {termChecksDisplay}
    </div>
  )
}

interface FullPlanCardProps {
  planName: string
  brandIconSrc: string
  energyType: string
  termAndConditionContent?: string | null
  termAndConditionItems?: TermAndCondition[]
  control: Control
}

export default FullPlanCard
