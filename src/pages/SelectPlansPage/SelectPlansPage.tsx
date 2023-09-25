import { useContext } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'

import RegistrationStep from '../../components/RegistrationStep'
import PageWrapper from '../../components/PageWrapper'
import SelectPlansPageTitle from './SelectPlansPageTitle'
import { ELECTRICITY_VALUE, GAS_VALUE, RegistrationData } from '../../constants'
import PlanSelector from '../../components/PlanSelector'
import RegistrationContext from '../../contexts/RegistrationContext'
// import { REQUIRED_VALIDATION } from '../../constants/validation'
import ControllerPreferencesSelector from '../../components/Inputs/ControllerPreferencesSelector'
import PageNavigationActions from '../../components/PageNavigationActions'
import { useToast } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { convertPreference } from '../../api/common'
import { REQUIRED_VALIDATION } from '../../constants/validation'

const SelectPlansPage = () => {
  const { fireAlert } = useToast()
  const navigate = useNavigate()
  const { registrationData, createQuoteLineMutation, setRegistrationData, createQuoteMutation } =
    useContext(RegistrationContext)

  // On load page get data from context
  const { handleSubmit, control, formState, setValue } = useForm({
    mode: 'all',
    defaultValues: registrationData as FieldValues,
  })

  const onSubmit = async (data: RegistrationData) => {
    console.log(data)

    // Call API
    // Put data to context
    // return
    try {
      const electricityQuote = (registrationData.electricityQuote?.comparisons ?? []).find(
        (item) => item.id === data?.electricPlanId,
      )
      const gasQuote = (registrationData.gasQuote?.comparisons ?? []).find((item) => item.id === data?.gasPlanId)

      const createQuoteLineResults = await Promise.all([
        electricityQuote ? createQuoteLineMutation.mutateAsync({ comparison: electricityQuote }) : null,
        gasQuote ? createQuoteLineMutation.mutateAsync({ comparison: gasQuote }) : null,
      ])

      const electricityQuoteLineResponse = createQuoteLineResults[0]
      const gasQuoteLineResponse = createQuoteLineResults[1]

      const electricityQuoteData = {
        ...data.electricityQuote,
        ...electricityQuoteLineResponse?.comparison,
        quoteLineId: electricityQuoteLineResponse?.quoteLineId,
      }
      const gasQuoteData = {
        ...data.gasQuote,
        ...gasQuoteLineResponse?.comparison,
        quoteLineId: electricityQuoteLineResponse?.quoteLineId,
      }

      setRegistrationData((prev) => ({
        ...prev,
        ...data,
        electricityQuote: electricityQuoteData,
        gasQuote: gasQuoteData,
      }))
      navigate('/personal-detail-1')
    } catch (e) {
      fireAlert({ children: 'Something bad has occurred!', type: 'error' })
    }
  }

  const onPreferenceSaved = (newPreferences: string[]) => {
    const { opportunityId, accountDetails, businessDetails, categoryId, electricity, gas } = registrationData
    createQuoteMutation.mutate({
      opportunityId,
      accountId: businessDetails?.accountId,
      contactId: accountDetails?.contactId,
      categoryId,
      electricity,
      gas,
      preferences: convertPreference(newPreferences),
    })

    setValue('electricPlanId', null)
    setValue('gasPlanId', null)
  }

  const selectedEnergyType = registrationData?.energyType

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <RegistrationStep currentStep={1} />
        <hr className="hidden lg:block" />
        <ControllerPreferencesSelector
          name={'preferenceList'}
          control={control}
          rules={REQUIRED_VALIDATION}
          editable
          label=""
          onChangeSaved={onPreferenceSaved}
        />
        <SelectPlansPageTitle energyType={selectedEnergyType} />
        {selectedEnergyType !== GAS_VALUE ? (
          <Controller
            name="electricPlanId"
            control={control}
            rules={REQUIRED_VALIDATION}
            render={({ field }) => {
              return (
                <PlanSelector
                  title="Electricity Plan"
                  planType={ELECTRICITY_VALUE}
                  plans={registrationData.electricityQuote?.comparisons ?? []}
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
                  planType={GAS_VALUE}
                  plans={registrationData.gasQuote?.comparisons ?? []}
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
