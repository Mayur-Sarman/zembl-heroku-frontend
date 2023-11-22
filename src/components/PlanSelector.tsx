import { ReactNode, useCallback, useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react'

import PlanCard from './PlanCard'
import { QuoteComparison } from '../api/quote'
import { uniqueId } from 'lodash'

import { ELECTRICITY_VALUE } from '../constants'

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
      <Accordion open={open} key={Math.random()}>
        <AccordionHeader onClick={openToggleHandler}>{title}</AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan?.id}
              planId={plan?.id ?? uniqueId('quoteComparison')}
              brand={plan.retailerName ?? ''}
              // logoImageHTML={plan.retailerLogo}
              logoURL={plan.retailerLogo}
              bpidLink={plan.linkBPID ?? ''}
              detailLink={plan.detailLink ?? ''}
              exitPenalty={plan.exitPenalty}
              australianOwned={plan.australianOwned}
              contractLength={plan.contractLength}
              planDescription={plan.mandatoryInformation}
              planLessThanCurrentPricePercent={plan.percentDifference}
              planEstAnnualSaving={plan.annualSavingIncGST}
              planEstCostPerMonth={planType === ELECTRICITY_VALUE ? plan.billSize : plan.billCostGas}
              planEstCostPerYear={planType === ELECTRICITY_VALUE ? plan.annualBillSize : plan.annualBillCostGas}
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
            // logoImageHTML={selectedPlan.retailerLogo}
            logoURL={selectedPlan.retailerLogo}
            bpidLink={selectedPlan.linkBPID ?? ''}
            detailLink={selectedPlan.detailLink ?? ''}
            exitPenalty={selectedPlan.exitPenalty}
            australianOwned={selectedPlan.australianOwned}
            contractLength={selectedPlan.contractLength}
            planDescription={selectedPlan.mandatoryInformation}
            planLessThanCurrentPricePercent={selectedPlan.percentDifference}
            planEstAnnualSaving={selectedPlan.annualSavingIncGST}
            planEstCostPerMonth={planType === ELECTRICITY_VALUE ? selectedPlan.billSize : selectedPlan.billCostGas}
            planEstCostPerYear={planType === ELECTRICITY_VALUE ? selectedPlan.annualBillSize : selectedPlan.annualBillCostGas}
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
