import AccordionCard from './AccordionCard'
import FullPlanCard from './FullPlanCard'
import { ELECTRICITY_VALUE, GAS_VALUE } from '../constants'
import { Control, FieldValues, UseFormRegister } from 'react-hook-form'
import DuoPlanCard from './DuoPlanCard'

// const ICON_CLASS_NAME = 'w-4 h-4'

const SelectedPlans = ({
  title,
  // onEditClick,
  register,
  energyType,
  electricityPlan,
  gasPlan,
}: SelectedPlansProps) => {
  // const titleDisplay = (
  //   <div className="flex items-center w-full justify-between">
  //     <Typography variant="h6">{title}</Typography>
  //     <div
  //       tabIndex={0}
  //       onKeyDown={undefined}
  //       role="button"
  //       onClick={onEditClick}
  //       className="flex items-center gap-2 bg-transparent border-transparent shadow-none text-zembl-p pointer-events-auto"
  //     >
  //       <PencilSquareIcon className={ICON_CLASS_NAME} />
  //       <Typography className="text-sm">Edit</Typography>
  //     </div>
  //   </div>
  // )

  const individualPlanDisplay = (
    <>
      {energyType !== GAS_VALUE ? (
        <FullPlanCard energyType={ELECTRICITY_VALUE} {...electricityPlan} register={register} />
      ) : null}
      {energyType !== ELECTRICITY_VALUE ? (
        <FullPlanCard energyType={GAS_VALUE} {...gasPlan} register={register} />
      ) : null}
    </>
  )

  const duoPlanDisplay = <DuoPlanCard electricityPlan={electricityPlan} gasPlan={gasPlan} register={register} />

  return (
    <AccordionCard open alwaysOpen title={title}>
      <div className="grid grid-cols-1 gap-6 text-left">
        {electricityPlan.brand !== gasPlan.brand ? individualPlanDisplay : duoPlanDisplay}
      </div>
    </AccordionCard>
  )
}

interface SelectedPlansProps {
  title: string
  // onEditClick: MouseEventHandler
  register: UseFormRegister<FieldValues>
  control: Control
  energyType: string
  electricityPlan: PlanData
  gasPlan: PlanData
}

export interface PlanData {
  brandIconSrc: string
  planName: string
  brand: string
  termAndConditions: string
}

export default SelectedPlans
