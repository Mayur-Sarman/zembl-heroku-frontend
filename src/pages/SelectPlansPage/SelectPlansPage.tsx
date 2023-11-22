import { lazy, useContext } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'

import { ELECTRICITY_VALUE, GAS_VALUE, RegistrationData } from '../../constants'
import RegistrationContext from '../../contexts/RegistrationContext'
import { useNavigate } from 'react-router-dom'
import { convertPreference } from '../../api/common'
import { REQUIRED_VALIDATION } from '../../constants/validation'
import { useQuoteCallbackMutation } from '../../hooks/useQuoteCallbackMutation'
import { ZEMBL_DEBUG_MODE } from '../../constants/misc'
import { AxiosError } from 'axios'

const RegistrationStep = lazy(() => import('../../components/RegistrationStep'))
const PageWrapper = lazy(() => import('../../components/PageWrapper'))
const SelectPlansPageTitle = lazy(() => import('./SelectPlansPageTitle'))
const PlanSelector = lazy(() => import('../../components/PlanSelector'))
const ControllerPreferencesSelector = lazy(() => import('../../components/Inputs/ControllerPreferencesSelector'))
const PageNavigationActions = lazy(() => import('../../components/PageNavigationActions'))

const SelectPlansPage = () => {
  const navigate = useNavigate()
  const {
    registrationData,
    registrationToken,
    createQuoteLineMutation,
    setRegistrationData,
    createQuoteMutation,
    handleErrorResponse,
    setUploadText
  } = useContext(RegistrationContext)
  const quoteCallbackMutation = useQuoteCallbackMutation(registrationToken ?? '', {
    onSuccess: () => {
      setUploadText(null)
      navigate('/abn-error')
    },
    onError: (error: AxiosError) => {
      setUploadText(null)
      handleErrorResponse(error)
    },
  })

  // On load page get data from context
  const { handleSubmit, control, formState, setValue } = useForm({
    mode: 'all',
    defaultValues: registrationData as FieldValues,
  })

  const onSubmit = async (data: RegistrationData) => {
    // Call API
    // Put data to context
    try {
      const electricityQuote = (registrationData?.electricityQuote?.comparisons ?? []).find(
        (item) => item.id === data?.electricPlanId,
      )
      const gasQuote = (registrationData?.gasQuote?.comparisons ?? []).find((item) => item.id === data?.gasPlanId)

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
      if (ZEMBL_DEBUG_MODE) console.log('SELECT_PLAN_PAGE', e)
    }
  }

  const onPreferenceSaved = (newPreferences: string[]) => {
    const { opportunityId, accountDetails, businessDetails, categoryId, electricity, gas, siteRelationshipId, accountType } = registrationData
    createQuoteMutation.mutate({
      opportunityId,
      accountId: businessDetails?.accountId,
      contactId: accountDetails?.contactId,
      categoryId,
      electricity,
      gas,
      preferences: convertPreference(newPreferences),
      siteRelationshipId: siteRelationshipId,
      accountType: accountType
    })

    setValue('electricPlanId', null)
    setValue('gasPlanId', null)
  }

  const onRequestCallbackClicked = () => {
    try {
      // QUOTE CALLBACK MUTATION
      setUploadText('Please wait..')
      quoteCallbackMutation.mutate({
        callbackRequested: true,
        electricQuoteId: registrationData?.electricityQuote?.quoteId,
        gasQuoteId: registrationData?.gasQuote?.quoteId,
      })
    } catch (error) {
      if (ZEMBL_DEBUG_MODE) console.log('SELECT_PLAN_PAGE', error)
    }
  }

  const selectedEnergyType = registrationData?.energyType

  return (
    <PageWrapper showLoading={quoteCallbackMutation.isLoading && createQuoteMutation.isLoading}>
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
        <SelectPlansPageTitle energyType={selectedEnergyType} requestCallbackClick={onRequestCallbackClicked} />
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
                  plans={registrationData?.electricityQuote?.comparisons ?? []}
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
                  plans={registrationData?.gasQuote?.comparisons ?? []}
                  selectedPlanId={field.value as string}
                  onPlanSelect={field.onChange}
                />
              )
            }}
          />
        ) : null}
        <PageNavigationActions hidePrev nextDisabled={!formState.isValid} />
      </form>
    </PageWrapper>
  )
}

export default SelectPlansPage
