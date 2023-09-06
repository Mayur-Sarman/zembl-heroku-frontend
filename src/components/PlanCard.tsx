import { CheckIcon } from '@heroicons/react/20/solid'
import { Badge, Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'
import { useCallback } from 'react'

const PlanCard = ({
  onPlanChoose,
  planId,
  planDescription = 'Thrifty Business is 28% less than the DMO Reference Price. This applies to a Small business customer with a flat rate tariff in the Ausgrid distribution area. We estimate an annual cost of $4981 for an average customer who uses 20000kWh per year. Depending on your usage, your annual cost could be different.',
  planBenefits = ['No Exit Fees', '100% Australian Owned', '100% Australian Owned', '100% Australian Owned'],
  planHighlights = [
    { title: '24% less than', subtitle: 'The current reference price', hilight: true },
    { title: '24% less than', subtitle: 'Best price' },
    { title: '24% less than', subtitle: 'The current reference price' },
  ],
  brand = 'Big Boss Electicity',
  logoURL = '/vite.svg',
  selectButtonText,
  isSelected,
}: PlanCardProps) => {
  const onPlanChooseHandler = useCallback(() => onPlanChoose(planId), [planId, onPlanChoose])

  const cardDisplay = (
    <Card className={`bg-zembl-s1 w-full border ${isSelected ? 'border-green-400 border-2' : ''}`}>
      <CardBody className="flex flex-col gap-y-6">
        <div className="flex flex-wrap flex-shrink-0 lg:flex-nowrap gap-4 lg:gap-6">
          <div className="border rounded-2xl p-4 bg-gray-50 w-[calc(50%-0.5rem)] md:w-[calc(33.33%-0.5rem] lg:w-1/5">
            <img src={logoURL} alt="Brand Logo" className="w-16 h-full m-auto" />
          </div>
          <div className="text-left flex flex-col w-[calc(50%-0.5rem)] gap-y-3 md:w-[calc(33.33%-0.5rem] lg:w-1/5">
            <Typography variant="h6" className="mb-1">
              {brand}
            </Typography>
            <div role="button" onKeyDown={undefined} tabIndex={0} onClick={(a) => console.log(a)}>
              <Typography className="text-xs underline">Basic Plan Information Document</Typography>
            </div>
            <div role="button" onKeyDown={undefined} tabIndex={0} onClick={(a) => console.log(a)}>
              <Typography className="text-xs underline">View Details</Typography>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full md:w-[calc(33.33%-0.5rem] lg:w-1/5">
            {planBenefits?.map((item, index) => (
              <div
                key={item + index}
                className="border border-zembl-p text-zembl-p font-normal rounded-md p-2 text-xs overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {item}
              </div>
            )) ?? null}
          </div>
          <div className="grid grid-cols-2 gap-3 w-full lg:w-2/5 auto-rows-max">
            {planHighlights?.map((item, index) => (
              <div
                key={item.title + index}
                className={`rounded-md bg-zembl-s p-4 border border-zembl-p ${
                  item.hilight ? '!bg-zembl-action-primary' : ''
                }`}
              >
                <Typography variant="h6" className="text-lg">
                  {item.title}
                </Typography>
                <Typography className="text-xs">{item.subtitle}</Typography>
              </div>
            )) ?? null}
          </div>
        </div>
        <Typography variant="small" className='font-normal' title={planDescription}>{planDescription}</Typography>
      </CardBody>
      <CardFooter>
        <Button onClick={onPlanChooseHandler} className="bg-zembl-action-primary text-zembl-p">
          {selectButtonText ? selectButtonText : 'Choose Plan'}
        </Button>
      </CardFooter>
    </Card>
  )

  return isSelected ? (
    <Badge
      placement="top-end"
      className="bg-gradient-to-tr from-green-400 to-green-600 border-2 border-white shadow-lg shadow-black/20"
      // className="bg-zembl-action-primary text-zembl-p top-0 px-3 py-2 right-[5%]"
      content={<CheckIcon className="h-4 w-4 text-white" strokeWidth={2.5} />}
      // content={
      //   <div className="flex gap-1 items-center">
      //     <CheckCircleIcon className="h-4 w-4" />
      //     Current
      //   </div>
      // }
    >
      {cardDisplay}
    </Badge>
  ) : (
    cardDisplay
  )
}

export interface PlanCardProps {
  planId: string
  onPlanChoose: (planId: string) => void
  planDescription?: string
  minimized?: boolean
  brand?: string
  logoURL?: string
  planBenefits?: string[]
  planHighlights?: PlanHilightItem[]
  selectButtonText?: string
  isSelected?: boolean
}

export interface PlanHilightItem {
  title: string
  subtitle?: string
  hilight?: boolean
}

export default PlanCard
