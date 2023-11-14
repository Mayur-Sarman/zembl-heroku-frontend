import AccordionCard from './AccordionCard'
import FullPlanCard from './FullPlanCard'
import { ELECTRICITY_VALUE, GAS_VALUE } from '../constants'
import { Control } from 'react-hook-form'
import DuoPlanCard from './DuoPlanCard'
import { Quote } from '../api/quote'

const SelectedPlans = ({ title, control, energyType, electricityPlan, gasPlan }: SelectedPlansProps) => {

  const individualPlanDisplay = (
    <>
      {energyType !== GAS_VALUE && electricityPlan?.quoteId != null ? (
        <FullPlanCard
          energyType={ELECTRICITY_VALUE}
          planName={electricityPlan?.productName ?? ''}
          brandIconSrc={electricityPlan?.retailerLogo ?? ''}
          termAndConditionContent={electricityPlan?.termAndConditionContent}
          termAndConditionItems={electricityPlan?.termAndConditionCheckboxs}
          control={control}
        />
      ) : null}
      {energyType !== ELECTRICITY_VALUE && gasPlan?.quoteId != null ? (
        <FullPlanCard
          energyType={GAS_VALUE}
          control={control}
          planName={gasPlan?.productName ?? ''}
          brandIconSrc={gasPlan?.retailerLogo ?? ''}
          termAndConditionContent={gasPlan?.termAndConditionContent}
          termAndConditionItems={gasPlan?.termAndConditionCheckboxs}
        />
      ) : null}
    </>
  )

  const duoPlanDisplay = <DuoPlanCard electricityPlan={electricityPlan} gasPlan={gasPlan} control={control} />

  return (
    <AccordionCard open alwaysOpen title={title}>
      <div className="grid grid-cols-1 gap-6 text-left">
        {(electricityPlan?.retailerName !== gasPlan?.retailerName) ? individualPlanDisplay : duoPlanDisplay}
      </div>
    </AccordionCard>
  )
}

interface SelectedPlansProps {
  title: string
  control: Control
  energyType: string | null
  electricityPlan?: Quote | null
  gasPlan?: Quote | null
}

export default SelectedPlans
