import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import RegistrationStep from '../../components/RegistrationStep'
import PageWrapper from '../../components/PageWrapper'
import SelectPlansPageTitle from './SelectPlansPageTitle'
import { BOTH_VALUE, ELECTRICITY_VALUE, GAS_VALUE } from '../../constants'
import PlanSelector from '../../components/PlanSelector'
import RegistrationContext from '../../contexts/RegistrationContext'
import { REQUIRED_VALIDATION } from '../../constants/validation'
import ControllerPreferencesSelector from '../../components/Inputs/ControllerPreferencesSelector'
import PageNavigationActions from '../../components/PageNavigationActions'

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
    logoURL: '/vite.svg',
  },
]

const SelectPlansPage = () => {
  const { registrationData } = useContext(RegistrationContext)

  // On load page get data from context
  const { handleSubmit, control, formState } = useForm({
    mode: 'all',
  })
  const navigate = useNavigate()

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data)

    // Call API
    // Put data to context
    navigate('/personal-detail-1')
  }

  const selectedEnergyType = registrationData?.energyType?.energyType

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <RegistrationStep currentStep={1} />
        <hr className="hidden lg:block" />

        <ControllerPreferencesSelector
          name={'preferences'}
          control={control}
          rules={REQUIRED_VALIDATION}
          editable
          label=""
        />
        {/* <PreferenceSelector preferences={preferences} onChange={onPreferenceSelected} editable label="" /> */}
        <SelectPlansPageTitle energyType={BOTH_VALUE} />
        {selectedEnergyType !== GAS_VALUE ? (
          <Controller
            name="electricPlanId"
            control={control}
            rules={REQUIRED_VALIDATION}
            render={({ field }) => {
              return (
                <PlanSelector
                  title="Electricity Plan"
                  plans={mockupPlans}
                  selectedPlanId={field.value as string}
                  onPlanSelect={field.onChange}
                />
              )
            }}
          />
        ) : null}

        {selectedEnergyType !== ELECTRICITY_VALUE ? (
          <Controller
            name="gasPlanId"
            control={control}
            rules={REQUIRED_VALIDATION}
            render={({ field }) => {
              return (
                <PlanSelector
                  title="Gas Plan"
                  plans={mockupPlans}
                  selectedPlanId={field.value as string}
                  onPlanSelect={field.onChange}
                />
              )
            }}
          />
        ) : null}

        <PageNavigationActions prevLink="/bill-upload" nextDisabled={!formState.isValid} />
      </form>
    </PageWrapper>
  )
}

export default SelectPlansPage
