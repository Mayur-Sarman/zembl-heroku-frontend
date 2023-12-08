import { Typography } from '@material-tailwind/react'
import { ELECTRICITY_VALUE, GAS_VALUE } from '../constants'
import AccordionCard from './AccordionCard'
import ElectricIcon from './Icons/ElectricIcon'
import GasIcon from './Icons/GasIcon'
import PlanCard from './PlanCard'

const ICON_CLASSES = 'w-6 h-6'

const PlanSummaryCard = ({
  planId,
  planType,
  fullAddress,
  gasOrEnergyCode,
  planBrand,
  planLogoURL,
  exitPenalty,
  australianOwned,
  contractLength,
  planDescription,
  planLessThanCurrentPricePercent,
  planEstAnnualSaving,
  planEstCostPerMonth,
  planEstCostPerYear,
  bpidLink,
  retailerName
}: PlanSummaryCardProps) => {
  let planTypeIcon = null
  let nmiOrMirnText = null

  switch (planType) {
    case ELECTRICITY_VALUE:
      planTypeIcon = <ElectricIcon className={ICON_CLASSES} />
      nmiOrMirnText = 'NMI'
      break
    case GAS_VALUE:
      planTypeIcon = <GasIcon className={ICON_CLASSES} />
      nmiOrMirnText = 'MIRN'
      break
  }

  const cardHeader = (
    <div className="flex gap-3 md:gap-6">
      {planTypeIcon ?? null}
      <span className="flex flex-col lg:flex-row gap-1 lg:gap-2">
        <Typography variant="h6">Address</Typography>
        <Typography variant="paragraph">{fullAddress}</Typography>
      </span>
      <span className="flex flex-col lg:flex-row gap-1 lg:gap-2">
        <Typography variant="h6">{nmiOrMirnText}</Typography>
        <Typography variant="paragraph">{gasOrEnergyCode}</Typography>
      </span>
    </div>
  )
  return (
    <AccordionCard open alwaysOpen title={cardHeader} bodyClassName="flex flex-col p-0">
      <PlanCard
        planId={planId}
        planType={planType}
        bpidLink={bpidLink}
        brand={planBrand}
        logoURL={planLogoURL}
        exitPenalty={exitPenalty}
        australianOwned={australianOwned}
        contractLength={contractLength}
        planDescription={planDescription}
        planLessThanCurrentPricePercent={planLessThanCurrentPricePercent}
        planEstAnnualSaving={planEstAnnualSaving}
        planEstCostPerMonth={planEstCostPerMonth}
        planEstCostPerYear={planEstCostPerYear}
        hideSelectButton
        isReviewPlan={true}
        retailerName={retailerName}
      />
    </AccordionCard>
  )
}

interface PlanSummaryCardProps {
  planId: string
  planType: string
  fullAddress: string
  gasOrEnergyCode: string
  planBrand: string
  planLogoURL: string
  exitPenalty?: string
  australianOwned?: boolean
  contractLength?: string
  planDescription: string
  planLessThanCurrentPricePercent?: number
  planEstAnnualSaving?: number
  planEstCostPerMonth?: number
  planEstCostPerYear?: number
  bpidLink?: string
  retailerName?: string
}

export default PlanSummaryCard
