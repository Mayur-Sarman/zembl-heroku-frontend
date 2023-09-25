import { ReactNode, useCallback, useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react'

import PlanCard from './PlanCard'
import { QuoteComparison } from '../api/quote'
import { uniqueId } from 'lodash'

const PlanSelector = ({ plans, planType, selectedPlanId, onPlanSelect, title }: PlanSelectorProps) => {
  const [open, setOpen] = useState<boolean>(true)

  const openToggleHandler = useCallback(() => setOpen((prev) => !prev), [])
  const planSelectedHandler = useCallback(
    (value: string) => {
      onPlanSelect(value)
      setOpen(false)
    },
    [onPlanSelect],
  )

  const selectedPlan = plans.find((item) => item.id === selectedPlanId)

  return (
    <div>
      <Accordion open={open}>
        <AccordionHeader onClick={openToggleHandler}>{title}</AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan?.id}
              planId={plan?.id ?? uniqueId('quoteComparison')}
              brand={plan.retailerName ?? ''}
              logoURL={plan.retailerIconLink}
              bpidLink={plan.bpidLink ?? ''}
              detailLink={plan.detailLink ?? ''}
              planBenefits={plan.planBenefits}
              planDescription={plan.mandatoryInformation}
              planLessThanCurrentPricePercent={plan.billSize}
              planEstAnnualSaving={plan.annualSavingIncGST}
              planEstCostPerMonth={plan.planEstCostPerMonth}
              planEstCostPerYear={plan.planEstCostPerYear}
              planType={planType}
              isSelected={selectedPlanId === plan.id}
              selectButtonText={selectedPlanId === plan.id && open ? 'Change Plan' : 'Choose Plan'}
              onPlanChoose={planSelectedHandler}
            />
          ))}
        </AccordionBody>
      </Accordion>
      {selectedPlan && !open ? (
        <div className="py-4 w-full">
          <PlanCard
            planId={selectedPlan?.id ?? uniqueId('quoteComparison')}
            brand={selectedPlan.retailerName ?? ''}
            logoURL={selectedPlan.retailerIconLink}
            bpidLink={selectedPlan.bpidLink}
            detailLink={selectedPlan.detailLink}
            planBenefits={selectedPlan.planBenefits}
            planDescription={selectedPlan.mandatoryInformation}
            planLessThanCurrentPricePercent={selectedPlan.billSize}
            planEstAnnualSaving={selectedPlan.annualSavingIncGST}
            planEstCostPerMonth={selectedPlan.planEstCostPerMonth}
            planEstCostPerYear={selectedPlan.planEstCostPerYear}
            planType={planType}
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
  plans: QuoteComparison[]
  selectedPlanId: string | null | undefined
  onPlanSelect: (planId: string) => unknown
  planType: string
  title: ReactNode
}

export default PlanSelector
