import { ELECTRICITY_VALUE, GAS_VALUE } from '../constants'
import MiniPlanCard from './MiniPlanCard'
import TextNote from './TextNote'
import RichText from './RichText'
import { Control } from 'react-hook-form'
import ControllerCheckBox from './Inputs/ControllerCheckBox'
import { Quote } from '../api/quote'

const DuoPlanCard = ({ electricityPlan, gasPlan, control }: DuoPlanCardProps) => {
  const elecTermContent = electricityPlan?.termAndConditionContent ? (
    <TextNote>
      <RichText htmlString={electricityPlan?.termAndConditionContent} />
    </TextNote>
  ) : null

  const elecTermChecksDisplay =
    electricityPlan?.termAndConditions?.map((item, index) => (
      <ControllerCheckBox
        key={item.id}
        name={`electricityQuote.[${index}].accepted`}
        control={control}
        required
        label={item.label}
      />
    )) ?? null

  const gasTermContent = gasPlan?.termAndConditionContent ? (
    <TextNote>
      <RichText htmlString={gasPlan?.termAndConditionContent} />
    </TextNote>
  ) : null

  const gasTermChecksDisplay =
    gasPlan?.termAndConditions?.map((item, index) => (
      <ControllerCheckBox
        key={item.id}
        name={`gasQuote.[${index}].accepted`}
        control={control}
        required
        label={item.label}
      />
    )) ?? null

  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="grid p-2 md:p-6 grid-cols-1 gap-y-3 lg:grid-cols-2">
        <MiniPlanCard
          brandIcon={electricityPlan?.retailerIconLink ?? ''}
          energyType={ELECTRICITY_VALUE}
          planName={electricityPlan?.productName ?? ''}
        />
        <MiniPlanCard
          brandIcon={gasPlan?.retailerIconLink ?? ''}
          energyType={GAS_VALUE}
          planName={gasPlan?.productName ?? ''}
        />
      </div>
      {elecTermContent}
      {elecTermChecksDisplay}

      {gasTermContent}
      {gasTermChecksDisplay}
    </div>
  )
}

interface DuoPlanCardProps {
  electricityPlan?: Quote | null
  gasPlan?: Quote | null
  control: Control
}

export default DuoPlanCard
