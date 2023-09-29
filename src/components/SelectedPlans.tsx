import AccordionCard from './AccordionCard'
import FullPlanCard from './FullPlanCard'
import { ELECTRICITY_VALUE, GAS_VALUE } from '../constants'
import { Control } from 'react-hook-form'
import DuoPlanCard from './DuoPlanCard'
import { Quote } from '../api/quote'

// const ICON_CLASS_NAME = 'w-4 h-4'

const SelectedPlans = ({ title, control, energyType, electricityPlan, gasPlan }: SelectedPlansProps) => {
  const individualPlanDisplay = (
    <>
      {energyType !== GAS_VALUE ? (
        <FullPlanCard
          energyType={ELECTRICITY_VALUE}
          planName={electricityPlan?.productName ?? ''}
          brandIconSrc={electricityPlan?.retailerIconLink ?? ''}
          termAndConditionContent={electricityPlan?.termAndConditionContent}
          termAndConditionItems={electricityPlan?.termAndConditions}
          control={control}
        />
      ) : null}
      {energyType !== ELECTRICITY_VALUE ? (
        <FullPlanCard
          energyType={GAS_VALUE}
          control={control}
          planName={gasPlan?.productName ?? ''}
          brandIconSrc={gasPlan?.retailerIconLink ?? ''}
          termAndConditionContent={gasPlan?.termAndConditionContent}
          termAndConditionItems={gasPlan?.termAndConditions}
        />
      ) : null}
    </>
  )

  const duoPlanDisplay = <DuoPlanCard electricityPlan={electricityPlan} gasPlan={gasPlan} control={control} />

  return (
    <AccordionCard open alwaysOpen title={title}>
      <div className="grid grid-cols-1 gap-6 text-left">
        {electricityPlan?.retailerName !== gasPlan?.retailerName ? individualPlanDisplay : duoPlanDisplay}
      </div>
    </AccordionCard>
  )
}

interface SelectedPlansProps {
  title: string
  // onEditClick: MouseEventHandler
  control: Control
  energyType: string | null
  electricityPlan?: Quote | null
  gasPlan?: Quote | null
}

// export interface PlanData {
//   brandIconSrc: string
//   planName: string
//   brand: string
//   termAndConditions: string
// }

export default SelectedPlans
