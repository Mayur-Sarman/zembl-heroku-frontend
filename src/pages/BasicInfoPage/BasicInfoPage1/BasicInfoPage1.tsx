import { useController, useForm } from 'react-hook-form'
import { Button, Typography } from '@material-tailwind/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import StatefulButton from '../../../components/Inputs/StatefulButton'
import {
  BILLING_TYPE_MONTHLY,
  BILLING_TYPE_QUARTERLY,
  BOTH_VALUE,
  ELECTRICITY_VALUE,
  GAS_VALUE,
  NO_VALUE,
  PERIOD_SPEND_LESS,
  PERIOD_SPEND_MORE,
  YES_VALUE,
} from '../../../constants/registration'

import AccordionCard from '../../../components/AccordionCard'
import DateInput from '../../../components/Inputs/DateInput'
import InputWithLabel from '../../../components/Inputs/InputWithLabel'
import { useNavigate } from 'react-router-dom'

const BasicInfoPage1 = () => {
  // On load page get data from context
  const { register, handleSubmit, control } = useForm()
  const navigate = useNavigate()

  const { field: energyTypeCtrl } = useController({
    name: 'energyType',
    control,
    rules: { required: true },
  })

  const { field: moreThanOneCtrl } = useController({
    name: 'hasMoreThanOneBusiness',
    control,
    rules: { required: true },
  })

  const { field: movingCtrl } = useController({
    name: 'movingToNewLocation',
    control,
    rules: { required: true },
  })

  const { field: movingDateCtrl } = useController({
    name: 'movingDate',
    control,
    defaultValue: null,
    rules: { required: true },
  })

  const { field: billingTypeCtrl } = useController({
    name: 'billingType',
    control,
    rules: { required: true },
  })

  const { field: amountPerPeriodCtrl } = useController({
    name: 'amountPerPeriod',
    control,
    rules: { required: true },
  })

  const onSubmit = (data: Record<string, string>) => {
    console.log(data)

    // Call API
    // Put data to context
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
      <AccordionCard alwaysOpen open title="Business Details">
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <InputWithLabel
            inputLabel="Postcode"
            textLabel="Enter your postcode"
            icon={<MagnifyingGlassIcon fontSize={24} />}
            {...register('postcode')}
          />
          <InputWithLabel
            inputLabel="ABN"
            textLabel="Enter your ABN"
            icon={<MagnifyingGlassIcon fontSize={24} />}
            {...register('abn')}
          />
        </div>
      </AccordionCard>

      <AccordionCard alwaysOpen open title="Energy Type">
        <div className="w-full flex flex-col gap-3">
          <div className="text-left">
            <Typography variant="small" className="mb-2 pl-1">
              What type of business energy are you looking for?
            </Typography>
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={energyTypeCtrl.value === ELECTRICITY_VALUE}
                  onChange={energyTypeCtrl.onChange}
                  value={ELECTRICITY_VALUE}
                >
                  Electricity
                </StatefulButton>
              </div>
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={energyTypeCtrl.value === GAS_VALUE}
                  onChange={energyTypeCtrl.onChange}
                  value={GAS_VALUE}
                >
                  Gas
                </StatefulButton>
              </div>
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={energyTypeCtrl.value === BOTH_VALUE}
                  onChange={energyTypeCtrl.onChange}
                  value={BOTH_VALUE}
                >
                  Electricity & Gas
                </StatefulButton>
              </div>
            </div>
          </div>
          <div className="text-left">
            <Typography variant="small" className="mb-2 pl-1">
              Do you have more than one business location?
            </Typography>
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={moreThanOneCtrl.value === YES_VALUE}
                  onChange={moreThanOneCtrl.onChange}
                  value={YES_VALUE}
                >
                  Yes
                </StatefulButton>
              </div>
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={moreThanOneCtrl.value === NO_VALUE}
                  onChange={moreThanOneCtrl.onChange}
                  value={NO_VALUE}
                >
                  No
                </StatefulButton>
              </div>
              <div className="w-full lg:w-1/3"></div>
            </div>
          </div>
          <div className="text-left">
            <Typography variant="small" className="mb-2 pl-1">
              Are you moving to a new location?
            </Typography>
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={movingCtrl.value === 'yes'}
                  onChange={movingCtrl.onChange}
                  value="yes"
                >
                  Yes
                </StatefulButton>
              </div>
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={movingCtrl.value === 'no'}
                  onChange={movingCtrl.onChange}
                  value="no"
                >
                  No
                </StatefulButton>
              </div>
              <div className="w-full lg:w-1/3"></div>
            </div>
          </div>
          <div className="text-left">
            <Typography variant="small" className="mb-2 pl-1">
              Moving Date?
            </Typography>
            <div className="w-full lg:w-1/2">
              <DateInput onChange={movingDateCtrl.onChange} datepickerClassNames={'top-auto bottom-16'} />
            </div>
          </div>
        </div>
      </AccordionCard>

      <AccordionCard alwaysOpen open title="Energy Spend">
        <div className="w-full flex flex-col gap-3">
          <div className="text-left">
            <Typography variant="small" className="mb-2 pl-1">
              Do you receive your bills monthly or quarterly?
            </Typography>
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={billingTypeCtrl.value === BILLING_TYPE_MONTHLY}
                  onChange={billingTypeCtrl.onChange}
                  value={BILLING_TYPE_MONTHLY}
                >
                  Monthly
                </StatefulButton>
              </div>
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={billingTypeCtrl.value === BILLING_TYPE_QUARTERLY}
                  onChange={billingTypeCtrl.onChange}
                  value={BILLING_TYPE_QUARTERLY}
                >
                  Quarterly
                </StatefulButton>
              </div>
            </div>
          </div>
          <div className="text-left">
            <Typography variant="small" className="mb-2 pl-1">
              Roughly how much does your business spend on energy per month?
            </Typography>
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={amountPerPeriodCtrl.value === PERIOD_SPEND_LESS}
                  onChange={amountPerPeriodCtrl.onChange}
                  value={PERIOD_SPEND_LESS}
                >
                  Less than $2,500
                </StatefulButton>
              </div>
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={amountPerPeriodCtrl.value === PERIOD_SPEND_MORE}
                  onChange={amountPerPeriodCtrl.onChange}
                  value={PERIOD_SPEND_MORE}
                >
                  More than $2,500
                </StatefulButton>
              </div>
            </div>
          </div>
          <div className="text-left">
            <Typography variant="small" className="mb-2 pl-1">
              Roughly how much does your business spend on energy per quarter?
            </Typography>
            <div className="flex flex-wrap lg:flex-nowrap gap-3">
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={amountPerPeriodCtrl.value === PERIOD_SPEND_LESS}
                  onChange={amountPerPeriodCtrl.onChange}
                  value={PERIOD_SPEND_LESS}
                >
                  Less than $7,500
                </StatefulButton>
              </div>
              <div className="w-full lg:w-1/3">
                <StatefulButton
                  className="h-12"
                  checked={amountPerPeriodCtrl.value === PERIOD_SPEND_MORE}
                  onChange={amountPerPeriodCtrl.onChange}
                  value={PERIOD_SPEND_MORE}
                >
                  More than $7,500
                </StatefulButton>
              </div>
            </div>
          </div>
        </div>
      </AccordionCard>

      <div className="flex flex-col lg:flex-row gap-6 justify-center">
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
          className="text-zembl-p w-full lg:w-1/3 place-self-center"
        >
          Back
        </Button>
        <Button
          type="submit"
          onClick={() => navigate('/basic-info-2')}
          className="bg-zembl-action-primary text-zembl-p w-full lg:w-1/3 place-self-center"
        >
          Next
        </Button>
      </div>
    </form>
  )
}

export default BasicInfoPage1
