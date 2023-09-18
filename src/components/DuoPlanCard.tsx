import { ELECTRICITY_VALUE, GAS_VALUE } from '../constants'
import MiniPlanCard from './MiniPlanCard'
import TextNote from './TextNote'
import RichText from './RichText'
import { PlanData } from './SelectedPlans'
import { Control } from 'react-hook-form'
import ControllerCheckBox from './Inputs/ControllerCheckBox'

const DuoPlanCard = ({ electricityPlan, gasPlan, control }: DuoPlanCardProps) => {
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
      <ControllerCheckBox
        name={`acceptElectricTC1`}
        control={control}
        label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
        required
      />
      <ControllerCheckBox
        name={`acceptElectricTC2`}
        control={control}
        label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
        required
      />
      <TextNote>
        <RichText htmlString={gasPlan.termAndConditions} />
      </TextNote>
      <ControllerCheckBox
        name={`acceptGasTC1`}
        control={control}
        label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
        required
      />
      <ControllerCheckBox
        name={`acceptGasTC2`}
        control={control}
        label="By checking this box I agree this is my ‘Digital Signature’ and acceptance of all terms"
        required
      />
    </div>
  )
}

interface DuoPlanCardProps {
  electricityPlan: PlanData
  gasPlan: PlanData
  control: Control
}

export default DuoPlanCard
