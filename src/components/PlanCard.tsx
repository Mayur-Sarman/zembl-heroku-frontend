import { CheckIcon } from '@heroicons/react/20/solid'
import { Badge, Button, Card, CardBody, CardFooter, CardProps, Typography } from '@material-tailwind/react'
import { useCallback } from 'react'
import { ELECTRICITY_VALUE } from '../constants'
import { formatCurrency, formatPercent } from '../helpers/formatter'
import ControllerTooltip from './Icons/ControllerTooltip'
// import { NEXT_BUSINESS_ENERGY } from '../constants'

const PlanCard = ({
  planId,
  brand,
  logoURL = '',
  logoImageHTML,
  bpidLink = '#',
  // detailLink = '#',
  exitPenalty,
  australianOwned,
  contractLength,
  planDescription,
  planLessThanCurrentPricePercent,
  // planEstAnnualSaving,
  planEstCostPerMonth,
  planEstCostPerYear,
  planType,
  isSelected,
  selectButtonText,
  hideSelectButton = false,
  isReviewPlan = false,
  onPlanChoose,
}: PlanCardProps) => {
  const onPlanChooseHandler = useCallback(() => (onPlanChoose ? onPlanChoose(planId) : null), [planId, onPlanChoose])

  const cardDisplay = (
    <Card className={`bg-zembl-s1 w-full border ${isSelected ? 'border-green-400 border-2' : ''}`}>
      <CardBody className={`flex flex-col ${planDescription ? 'gap-y-6' : ''}`}>
        <div className={`flex flex-wrap flex-shrink-0 lg:flex-nowrap gap-4 lg:gap-6`}>
          <div className="w-[144px] relative">
            {logoURL ? <img src={logoURL} alt="Brand Logo" className={`w-[144px] h-auto inset-x-0 m-auto`} /> : null}
            {logoImageHTML ? (
              <div
                className="flex items-center justify-center  grow-0 h-full"
                dangerouslySetInnerHTML={{ __html: logoImageHTML }}
              />
            ) : null}
          </div>
          <div className="text-left flex flex-col w-[calc(50%-0.5rem)] gap-y-3 md:w-[calc(33.33%-0.5rem] lg:w-1/5">
            <Typography variant="h6" className="mb-1">
              {brand}
            </Typography>
            <div role="button" onKeyDown={undefined} tabIndex={0}>
              <a href={bpidLink} target="_blank" rel="noreferrer">
                <Typography className="text-xs underline">Basic Plan Information Document</Typography>
              </a>
            </div>
            {/* <div role="button" onKeyDown={undefined} tabIndex={0}>
              <a href={detailLink} target="_blank" rel="noreferrer">
                <Typography className="text-xs underline">View Details</Typography>
              </a>
            </div> */}
          </div>
          <div className="flex flex-col gap-1 w-full md:w-[calc(33.33%-0.5rem] lg:w-1/5">
            {exitPenalty ? (
              <div className="border border-zembl-p text-zembl-p font-normal rounded-md p-2 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                {exitPenalty}
              </div>
            ) : null}
            {australianOwned ? (
              <div className="border border-zembl-p text-zembl-p font-normal rounded-md p-2 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                100% Australian Owned
              </div>
            ) : null}
            {contractLength ? (
              <div className="border border-zembl-p text-zembl-p font-normal rounded-md p-2 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                {contractLength}
              </div>
            ) : null}
          </div>
          <div className={`grid grid-cols-2 ${isReviewPlan ? 'gap-y-0 gap-x-3' : 'gap-3'} w-full lg:w-2/5 auto-rows-max`}>
            { planType === ELECTRICITY_VALUE ?
              <>
                <div></div>
                <PlanHilight
                  className={planType === ELECTRICITY_VALUE ? 'mb-2 h-[67px]' : 'hidden lg:flex opacity-0 h-0 pointer-events-none'}
                >
                  <Typography variant="h6" className="text-lg">
                    {formatPercent(planLessThanCurrentPricePercent)} {formatPercent(planLessThanCurrentPricePercent) != 'N/A' ? 'Less than' : '' }
                  </Typography>
                  <Typography className="text-[10px] font-normal">{formatPercent(planLessThanCurrentPricePercent) != 'N/A' ? 'the current reference price' : 'no reference price information available' }</Typography>
                </PlanHilight>
              </> : null
            }
            
            
            
            {/* <PlanHilight
              className={`!bg-zembl-action-primary ${planType === GAS_VALUE ? 'col-span-2 lg:col-span-1' : ''}`}
            >
              <Typography className="text-xs font-normal">Estimated Annual Saving</Typography>
              <div className="flex items-baseline justify-center gap-1 ">
                <Typography variant="h4" className="text-lg">
                  {formatCurrency(planEstAnnualSaving)}
                </Typography>
                <Typography className="text-xs font-normal">inc GST</Typography>
              </div>
            </PlanHilight> */}

            {/* <PlanHilight>
              <div className="inline-block">
              <Typography className="text-xs font-normal inline-block mr-1">Estimated Cost</Typography>
              <ControllerTooltip tooltipText={`Approximate charges (incl GST) for 31 days based on average 27.47 KWh daily usage. The estimated cost displayed is rounded up to the closest dollar (Example: $352.38 is rounded up to $353)`} />
              </div>
              <div className="flex items-baseline justify-center gap-1 ">
                <Typography variant="h6" className="text-lg">
                  {formatCurrency(planEstCostPerMonth)}
                </Typography>
                <Typography className="text-xs font-normal">/ Quarterly</Typography>
              </div>
            </PlanHilight>

            <PlanHilight>
            <div className="inline-block">
              <Typography className="text-xs font-normal inline-block mr-1">Estimated Cost</Typography>
              <ControllerTooltip tooltipText={`Approximate charges (incl GST) for 31 days based on average 27.47 KWh daily usage. The estimated cost displayed is rounded up to the closest dollar (Example: $352.38 is rounded up to $353)`} />
              </div>
              <div className="flex items-baseline justify-center gap-1 ">
                <Typography variant="h6" className="text-lg">
                  {formatCurrency(planEstCostPerYear)}
                </Typography>
                <Typography className="text-xs font-normal">/ Year</Typography>
              </div>
            </PlanHilight> */}
          </div>
        </div>
        <Typography variant="small" className="font-small text-left" title={planDescription}>
          {planDescription}
        </Typography>
      </CardBody>
      <CardFooter className={`${hideSelectButton ? 'hidden' : ''}`}>
        <Button onClick={onPlanChooseHandler} className={`capitalize !zembl-btn`}>
          {selectButtonText ? selectButtonText : 'Choose Plan'}
        </Button>
      </CardFooter>
    </Card>
  )

  return isSelected ? (
    <Badge
      containerProps={{ className: 'w-full' }}
      placement={'bottom-end'}
      className="bg-gradient-to-tr from-green-400 to-green-600 border-2 border-white shadow-lg shadow-black/20 bottom-8 right-8"
      content={<CheckIcon className="h-4 w-4 text-white" strokeWidth={2.5} />}
    >
      {cardDisplay}
    </Badge>
  ) : (
    cardDisplay
  )
}

const PlanHilight = ({ children, className }: CardProps) => {
  return (
    <div className={`flex flex-col justify-between rounded-md p-2 border border-zembl-p bg-zembl-s ${className}`}>
      {children}
    </div>
  )
}

export interface PlanCardProps {
  planId: string
  brand?: string
  logoURL?: string
  logoImageHTML?: string
  bpidLink?: string
  detailLink?: string
  exitPenalty?: string
  australianOwned?: boolean
  contractLength?: string
  planDescription?: string
  planLessThanCurrentPricePercent?: number | string
  planEstAnnualSaving?: number
  planEstCostPerMonth?: number
  planEstCostPerYear?: number
  planType?: string
  isSelected?: boolean
  selectButtonText?: string
  hideSelectButton?: boolean
  onPlanChoose?: (planId: string) => void
  minimized?: boolean
  isReviewPlan?: boolean
  retailerName?: string
}

export default PlanCard
