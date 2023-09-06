import { ChangeEvent, useCallback, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@material-tailwind/react'

import RegistrationStep from '../../components/RegistrationStep'
import PageWrapper from '../../components/PageWrapper'
import PreferenceSelector from '../../components/PreferenceSelector'
import SelectPlansPageTitle from './SelectPlansPageTitle'
import { BOTH_VALUE, ELECTRICITY_VALUE, GAS_VALUE } from '../../constants'
import PlanSelector from '../../components/PlanSelector'
import RegistrationContext from '../../contexts/RegistrationContext'

const mockupPlans = [
  {
    planId: 'test1',
    planDescription:
      'Thrifty Business is 28% less than the DMO Reference Price. This applies to a Small business customer with a flat rate tariff in the Ausgrid distribution area. We estimate an annual cost of $4981 for an average customer who uses 20000kWh per year. Depending on your usage, your annual cost could be different.',
    planBenefits: ['No Exit Fees', '100% Australian Owned', 'Best Price'],
    planType: ELECTRICITY_VALUE,
    planLessThanCurrentPricePercent: 0.24,
    planEstAnnualSaving: 10000,
    planEstCostPerMonth: 240,
    planEstCostPerYear: 2400,
    brand: 'Big Boss Electicity',
    logoURL: '/vite.svg',
  },
  {
    planId: 'test2',
    planDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et tellus est. Nam nec urna quis lectus dignissim auctor eget sit amet augue. Nulla id metus et mauris ullamcorper faucibus. Praesent sit amet porttitor tortor, a pharetra orci. Nunc nec lobortis lacus, vel tempus justo. Praesent quis eros et quam volutpat sodales. Quisque nibh quam, congue a dolor in, dignissim commodo ligula. Donec ex tellus, mollis non maximus eu, varius nec lectus. Vivamus auctor cursus pretium. Nulla rhoncus blandit dui non bibendum. Cras convallis fringilla dolor, quis ullamcorper tellus tristique sed. Praesent nec magna et neque luctus pharetra at convallis ante. Nulla facilisi. Mauris volutpat dui quam, nec tincidunt elit lobortis ac. Maecenas laoreet mi non mollis scelerisque.Thrifty Business is 28% less than the DMO Reference Price. This applies to a Small business customer with a flat rate tariff in the Ausgrid distribution area. We estimate an annual cost of $4981 for an average customer who uses 20000kWh per year. Depending on your usage, your annual cost could be different.',
    planBenefits: ['No Exit Fees', '100% Australian Owned', '100% Australian Owned', '100% Australian Owned'],
    planType: GAS_VALUE,
    planLessThanCurrentPricePercent: 0.1,
    planEstAnnualSaving: 1400,
    planEstCostPerMonth: 620,
    planEstCostPerYear: 6000,
    brand: 'Lorem ipsum',
    logoURL: 'https://www.lipsum.com/images/banners/black_234x60.gif',
  },
]

const SelectPlansPage = () => {
  const { registrationData } = useContext(RegistrationContext)
  const [preferences, setPreferences] = useState<string[]>([])
  const [selectedElecPlanId, setSelectedElecPlanId] = useState<string | null>(null)
  const [selectedGasPlanId, setSelectedGasPlanId] = useState<string | null>(null)

  // On load page get data from context
  const { handleSubmit, setValue } = useForm({
    defaultValues: { preferences: [] },
  })
  const navigate = useNavigate()

  const onPreferenceSelected = useCallback(
    (event: ChangeEvent<HTMLButtonElement>) => {
      const value = event.target.value
      setPreferences((prev) => {
        const isSelected = prev.includes(value)
        const values = isSelected ? prev.filter((i) => i != value) : [...prev, value]

        setValue('preferences', values as never)
        return values
      })
    },
    [setValue],
  )

  const onElecPlanSelected = useCallback((planId: string) => {
    setSelectedElecPlanId(planId)
  }, [])

  const onGasPlanSelected = useCallback((planId: string) => {
    setSelectedGasPlanId(planId)
  }, [])

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data)

    // Call API
    // Put data to context
  }

  const selectedEnergyType = registrationData.energyType?.energyType

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <div className="lg:h-32 lg:py-3 lg:px-14 lg:mt-6">
          <div className="hidden lg:block">
            <RegistrationStep currentStep={1} />
          </div>
        </div>
        <hr className="hidden lg:block" />

        <PreferenceSelector preferences={preferences} onChange={onPreferenceSelected} editable label="" />
        <SelectPlansPageTitle energyType={BOTH_VALUE} />
        {selectedEnergyType !== GAS_VALUE ? (
          <PlanSelector
            title="Electricity Plan"
            plans={mockupPlans}
            selectedPlanId={selectedElecPlanId}
            onPlanSelect={onElecPlanSelected}
          />
        ) : null}

        {selectedEnergyType !== ELECTRICITY_VALUE ? (
          <PlanSelector
            title="Gas Plan"
            plans={mockupPlans}
            selectedPlanId={selectedGasPlanId}
            onPlanSelect={onGasPlanSelected}
          />
        ) : null}

        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          <Button
            variant="outlined"
            onClick={() => navigate('/bill-upload')}
            className="text-zembl-p w-full lg:w-1/3 place-self-center"
          >
            Back
          </Button>
          <Button
            type="submit"
            onClick={() => navigate('/personal-detail-1')}
            className="bg-zembl-action-primary text-zembl-p w-full lg:w-1/3 place-self-center"
          >
            Next
          </Button>
        </div>
      </form>
    </PageWrapper>
  )
}

export default SelectPlansPage
