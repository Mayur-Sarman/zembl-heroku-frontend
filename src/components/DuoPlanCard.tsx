import { ELECTRICITY_VALUE, GAS_VALUE } from '../constants'
import MiniPlanCard from './MiniPlanCard'
import TextNote from './TextNote'
import RichText from './RichText'
import { Checkbox } from '@material-tailwind/react'
import { PlanData } from './SelectedPlans'
import { FieldValues, UseFormRegister } from 'react-hook-form'

const DuoPlanCard = ({ electricityPlan, gasPlan, register }: DuoPlanCardProps) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="grid p-2 md:p-6 grid-cols-1 gap-y-3 lg:grid-cols-2">
        <MiniPlanCard
          brandIcon={electricityPlan.brandIconSrc}
          energyType={ELECTRICITY_VALUE}
          planName={electricityPlan.planName}
        />
        <MiniPlanCard brandIcon={gasPlan.brandIconSrc} energyType={GAS_VALUE} planName={gasPlan.planName} />
      </div>
      <TextNote>
        <RichText htmlString={electricityPlan.termAndConditions} />
      </TextNote>
      <Checkbox
        type="checkbox"
        label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
        {...register(`acceptElectricTC1`)}
        crossOrigin=""
      />
      <Checkbox
        type="checkbox"
        label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
        {...register(`accept$ElectricTC2`)}
        crossOrigin=""
      />
      <TextNote>
        <RichText htmlString={gasPlan.termAndConditions} />
      </TextNote>
      <Checkbox
        type="checkbox"
        label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
        {...register(`acceptGasTC1`)}
        crossOrigin=""
      />
      <Checkbox
        type="checkbox"
        label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
        {...register(`accept$GasTC2`)}
        crossOrigin=""
      />
    </div>
  )
}

interface DuoPlanCardProps {
  electricityPlan: PlanData
  gasPlan: PlanData
  register: UseFormRegister<FieldValues>
}

export default DuoPlanCard
