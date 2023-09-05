import { Button, Card, CardBody, CardFooter,  Typography } from '@material-tailwind/react'
import { useCallback } from 'react'

const PlanCard = ({ planDescription, brand, onPlanChoose, planId, minimized }: PlanCardProps) => {
  const onPlanChooseHandler = useCallback(() => onPlanChoose(planId), [planId, onPlanChoose])
  return (
    <Card className="bg-zembl-s1 w-full border">
      <CardBody className="flex flex-col gap-y-6">
        <div className="flex flex-wrap flex-shrink-0 lg:flex-nowrap gap-4 lg:gap-6">
          <div className="border rounded-2xl p-4 w-[calc(50%-0.5rem)] md:w-[calc(33.33%-0.5rem] lg:w-1/5">
            <img src="/vite.svg" alt="Test Logo" className="w-16 h-full m-auto" />
          </div>
          <div className="text-left flex flex-col w-[calc(50%-0.5rem)] gap-y-3 md:w-[calc(33.33%-0.5rem] lg:w-1/5">
            <Typography variant="h6" className="mb-1">
              Big Boss Electicity
            </Typography>
            <div role="button" onKeyDown={undefined} tabIndex={0} onClick={(a) => console.log(a)}>
              <Typography className="text-xs underline">Basic Plan Information Document</Typography>
            </div>
            <div role="button" onKeyDown={undefined} tabIndex={0} onClick={(a) => console.log(a)}>
              <Typography className="text-xs underline">View Details</Typography>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full md:w-[calc(33.33%-0.5rem] lg:w-1/5">
            <Button variant="outlined" className='text-ellipsis overflow-hidden whitespace-nowrap disabled:opacity-100' disabled>No Exit Fees</Button>
            <Button variant="outlined" className='text-ellipsis overflow-hidden whitespace-nowrap disabled:opacity-100' disabled>100% Australia Owned</Button>
            <Button variant="outlined" className='text-ellipsis overflow-hidden whitespace-nowrap disabled:opacity-100' disabled>No lock in contact</Button>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full lg:w-2/5">
            <div className="rounded-md bg-zembl-s p-4 border border-zembl-p">
              <Typography className="text-lg">24% less than</Typography>
              <Typography className="text-xs">The current reference price</Typography>
            </div>
            <div className="rounded-md bg-zembl-action-primary p-4 border border-zembl-p">
              <Typography className="text-lg">24% less than</Typography>
              <Typography className="text-xs">The current reference price</Typography>
            </div>
            <div className="rounded-md bg-zembl-s p-4 border border-zembl-p">
              <Typography className="text-lg">24% less than</Typography>
              <Typography className="text-xs">The current reference price</Typography>
            </div>
            <div className="rounded-md bg-zembl-s p-4 border border-zembl-p">
              <Typography className="text-lg">24% less than</Typography>
              <Typography className="text-xs">The current reference price</Typography>
            </div>
          </div>
        </div>
        <div>
          Thrifty Business is 28% less than the DMO Reference Price. This applies to a Small business customer with a
          flat rate tariff in the Ausgrid distribution area. We estimate an annual cost of $4981 for an average customer
          who uses 20000kWh per year. Depending on your usage, your annual cost could be different.
        </div>
      </CardBody>
      <CardFooter>
        <Button onClick={onPlanChooseHandler} className="bg-zembl-action-primary text-zembl-p">
          Choose Plan
        </Button>
      </CardFooter>
    </Card>
  )
}

interface PlanCardProps {
  planId: string
  onPlanChoose: (planId: string) => void
  planDescription?: string
  minimized?: boolean
  brand?: string
}

export default PlanCard
