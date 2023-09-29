import ControllerRadioGroupInput from '../../Inputs/ControllerRadioGroupInput'
import {
  BILLING_TYPE_MONTHLY,
  BILLING_TYPE_OPTIONS,
  BILLING_TYPE_QUARTERLY,
  MONTHLY_SPEND_OPTIONS,
  QUARTERLY_SPEND_OPTIONS,
} from '../../../constants'
import { REQUIRED_VALIDATION } from '../../../constants/validation'
import AccordionCard from '../../AccordionCard'
import { Control } from 'react-hook-form'

const EnergySpendForm = ({ control, billingType }: EnergySpendFormProps) => {
  return (
    <AccordionCard alwaysOpen open title="Energy Spend">
      <div className="w-full flex flex-col gap-3 text-left">
        <ControllerRadioGroupInput
          control={control}
          name="billFrequency"
          options={BILLING_TYPE_OPTIONS}
          rules={REQUIRED_VALIDATION}
          label={'Do you receive your bills monthly or quarterly?'}
        />
        {[BILLING_TYPE_MONTHLY, BILLING_TYPE_QUARTERLY].includes(billingType) ? (
          <ControllerRadioGroupInput
            control={control}
            name="billEnergySpend"
            options={billingType === BILLING_TYPE_QUARTERLY ? QUARTERLY_SPEND_OPTIONS : MONTHLY_SPEND_OPTIONS}
            rules={REQUIRED_VALIDATION}
            label={'Roughly how much does your business spend on energy per month?'}
          />
        ) : null}
      </div>
    </AccordionCard>
  )
}

interface EnergySpendFormProps {
  control: Control
  billingType: string
}

export default EnergySpendForm
