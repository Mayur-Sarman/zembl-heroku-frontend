import { useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { useModal, useToast } from '../../hooks'
import { Button, Input, Typography } from '@material-tailwind/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import BasicInfoPageTitle from './BasicInfoPageTitle'
import StatefulButton from '../../components/Inputs/StatefulButton'
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
} from '../../constants/registration'
import Datepicker from 'tailwind-datepicker-react'
import AccordionCard from '../../components/AccordionCard'

const BasicInfoPage = ({ pageNo }: { pageNo: number }) => {
  const { fireAlert } = useToast()
  const { openModal } = useModal()
  const { register, handleSubmit, control } = useForm()

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

  const [movingDateOpen, setMovingDateOpen] = useState<boolean>(false)

  const onSubmit = (data: Record<string, string>) => {
    console.log(data)
  }

  const header = pageNo === 1 ? <BasicInfoPageTitle /> : null

  useEffect(() => {
    // fireAlert({ children: <Typography>Test</Typography>, type: 'error' })
    // fireAlert({ children: <Typography>TestTEasdfasdf</Typography>, type: 'error', icon: <ExclamationCircleIcon width={25} height={25} /> })
    // openModal({ open: true, content: <Typography>Test</Typography>, dismissible: true })
    // throw new Error("Test");
  }, [fireAlert, openModal])

  return (
    <div className="flex flex-col text-center h-full">
      <div className="flex flex-col items-center gap-6 py-6 px-4 max-w-screen-xl w-full m-auto">
        {header}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
          <AccordionCard alwaysOpen open title="Business Details">
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              <div className="text-left">
                <Typography variant="small" className="mb-2 pl-1">
                  Enter your postcode
                </Typography>
                <Input
                  label="Postcode"
                  icon={<MagnifyingGlassIcon fontSize={24} />}
                  {...register('postcode')}
                  crossOrigin=""
                />
              </div>
              <div className="text-left">
                <Typography variant="small" className="mb-2 pl-1">
                  Enter your ABN
                </Typography>
                <Input label="ABN" icon={<MagnifyingGlassIcon fontSize={24} />} {...register('abn')} crossOrigin="" />
              </div>
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
                  <Datepicker
                    show={movingDateOpen}
                    setShow={(prev) => setMovingDateOpen(prev)}
                    onChange={movingDateCtrl.onChange}
                    options={{
                      datepickerClassNames: 'top-auto bottom-16',
                      theme: {
                        background: 'bg-white dark:bg-zembl-p',
                        todayBtn: 'bg-zembl-action-primary text-zembl-p',
                        clearBtn: '',
                        icons: '',
                        text: '',
                        disabledText: 'bg-grey-500',
                        input: 'bg-white dark:bg-zembl-p',
                        inputIcon: '',
                        selected: '',
                      },
                    }}
                  />
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
            <Button variant="outlined" className="text-zembl-p w-full lg:w-1/3 place-self-center">
              Back
            </Button>
            <Button type="submit" className="bg-zembl-action-primary text-zembl-p w-full lg:w-1/3 place-self-center">
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BasicInfoPage
