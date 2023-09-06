import { ReactNode, useCallback, useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react'

import PlanCard from './PlanCard'
import { ELECTRICITY_VALUE, GAS_VALUE } from '../constants'

const PlanSelector = ({ plans, selectedPlanId, onPlanSelect, title }: PlanSelectorProps) => {
  const [open, setOpen] = useState<boolean>(true)

  const openToggleHandler = useCallback((forceState: unknown) => setOpen((prev) => !!forceState || !prev), [])
  const planSelectedHandler = useCallback(
    (value: string) => {
      onPlanSelect(value)
      setOpen(false)
    },
    [onPlanSelect],
  )

  const selectedPlan = plans.find((item) => item.planId === selectedPlanId)

  return (
    <div>
      <Accordion open={open}>
        <AccordionHeader onClick={openToggleHandler}>{title}</AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.planId}
              planId={plan.planId}
              brand={plan.brand}
              logoURL={plan.logoURL}
              planBenefits={plan.planBenefits}
              planDescription={plan.planDescription}
              planLessThanCurrentPricePercent={plan.planLessThanCurrentPricePercent}
              planEstAnnualSaving={plan.planEstAnnualSaving}
              planEstCostPerMonth={plan.planEstCostPerMonth}
              planEstCostPerYear={plan.planEstCostPerYear}
              planType={plan.planType}
              isSelected={selectedPlanId === plan.planId}
              selectButtonText={selectedPlanId === plan.planId && open ? 'Change Plan' : 'Choose Plan'}
              onPlanChoose={planSelectedHandler}
            />
          ))}
        </AccordionBody>
      </Accordion>
      {selectedPlan && !open ? (
        <div className="py-4">
          <PlanCard
            planId={selectedPlan.planId}
            brand={selectedPlan.brand}
            logoURL={selectedPlan.logoURL}
            planBenefits={selectedPlan.planBenefits}
            planDescription={selectedPlan.planDescription}
            planLessThanCurrentPricePercent={selectedPlan.planLessThanCurrentPricePercent}
            planEstAnnualSaving={selectedPlan.planEstAnnualSaving}
            planEstCostPerMonth={selectedPlan.planEstCostPerMonth}
            planEstCostPerYear={selectedPlan.planEstCostPerYear}
            planType={selectedPlan.planType}
            isSelected
            selectButtonText="Change Plan"
            onPlanChoose={openToggleHandler}
          ></PlanCard>
        </div>
      ) : null}
    </div>
  )
}

interface PlanSelectorProps {
  plans: Plan[]
  selectedPlanId: string | null | undefined
  onPlanSelect: (planId: string) => unknown
  title: ReactNode
}

interface Plan {
  planId: string
  planDescription: string
  planBenefits: string[]
  planLessThanCurrentPricePercent?: number
  planEstAnnualSaving: number
  planEstCostPerMonth: number
  planEstCostPerYear: number
  planType: GAS_VALUE | ELECTRICITY_VALUE
  brand: string
  logoURL: string
}

export default PlanSelector
