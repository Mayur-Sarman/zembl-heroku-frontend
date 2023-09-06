import { ReactNode, useCallback, useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react'

import PlanCard, { PlanHilightItem } from './PlanCard'

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
              planHighlights={plan.planHighlights}
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
            planHighlights={selectedPlan.planHighlights}
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
  planHighlights: PlanHilightItem[]
  brand: string
  logoURL: string
}

export default PlanSelector
