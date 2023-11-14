import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'
import { FieldValues, useForm } from 'react-hook-form'
import RegistrationContext from '../../contexts/RegistrationContext'
import { useContext, useEffect } from 'react'
import { Typography } from '@material-tailwind/react'
import { ELECTRICITY_VALUE, GAS_VALUE, RegistrationData } from '../../constants'
import PlanSummaryCard from '../../components/PlanSummaryCard'
import AccountDetailsForm from '../../components/Forms/PersonalDetails/AccountDetailsForm'
import BusinessDetailsForm from '../../components/Forms/PersonalDetails/BusinessDetailsForm'
import PageNavigationActions from '../../components/PageNavigationActions'
import ControllerCheckBox from '../../components/Inputs/ControllerCheckBox'
import { useFetchQuoteDataQuery } from '../../hooks/useQueryPlanData'
import { AccountDetail, ProcessQuoteOutput } from '../../api/quote'
import { useUpdateQuoteMutation } from '../../hooks/useUpdateQuoteMutation'
import { getJSONDateString, getPhoneNumber } from '../../helpers/formatter'
import { ZEMBL_DEBUG_MODE } from '../../constants/misc'

const ReviewPlanPage = () => {
  const navigate = useNavigate()
  const { registrationData, registrationToken, setRegistrationData, handleErrorResponse } =
    useContext(RegistrationContext)

  // On load page get data from context
  const { handleSubmit, control, setValue, watch, getValues, trigger, formState } = useForm({
    mode: 'all',
    defaultValues: registrationData as FieldValues,
  })

  const businessDetails: unknown = watch('businessDetails')
  const accountDetails: unknown = watch('accountDetails')

  console.log('accountDetails =>', accountDetails);
  const getPlanData = useFetchQuoteDataQuery(
    { quoteToken: registrationData?.quoteToken as string, token: registrationToken ?? '' },
    {
      onSuccess: (data: ProcessQuoteOutput) => {
        const updatedAccountDetail = {
          ...data?.accountDetails,
          mobile: data?.accountDetails?.mobile?.replace('+', '') ?? undefined,
          altPhone: data?.accountDetails?.altPhone?.replace('+', '') ?? undefined,
        }
        setRegistrationData((prev) => ({
          ...prev,
          ...(data as Partial<RegistrationData>),
          accountDetails: updatedAccountDetail,
        }))
        setValue('businessDetails', data.businessDetails)
        setValue('accountDetails', updatedAccountDetail)
        setValue('accountDetails.dateOfBirth', getJSONDateString(data?.accountDetails?.dateOfBirth as string))
      },
      onError: (error) => {
        if (ZEMBL_DEBUG_MODE) console.log('REVIEW_PLAN_PAGE', error)
        handleErrorResponse(error, 'Unfortunately, we cannot find your quote.')
      },
    },
  )

  const updatePlanData = useUpdateQuoteMutation({
    onSuccess: (_, data) => {
      setRegistrationData((prev) => ({ ...prev, ...data.planData }))
    },
    onError: (error) => {
      if (ZEMBL_DEBUG_MODE) console.log('REVIEW_PLAN_PAGE', error)
      handleErrorResponse(error, 'We cannot process your request to update the plan data now.')
    },
  })

  const onFormSaved = () => {
    let updatedAccount = getValues('accountDetails') as AccountDetail

    if (formState.errors?.accountDetails)
      return trigger(
        [
          'accountDetails.title',
          'accountDetails.firstName',
          'accountDetails.lastName',
          'accountDetails.dateOfBirth',
          'accountDetails.email',
          'accountDetails.mobile',
          'accountDetails.altPhone',
        ],
        { shouldFocus: true },
      )

    if (updatedAccount) {
      updatedAccount = {
        ...registrationData?.accountDetails,
        ...updatedAccount,
        dateOfBirth: getJSONDateString(updatedAccount.dateOfBirth),
        mobile: getPhoneNumber(updatedAccount.mobile)
      }
      registrationData.accountDetails = updatedAccount
      const updatedPlanData = { ...registrationData, accountDetails: updatedAccount }
      updatePlanData.mutate({ planData: updatedPlanData, token: registrationToken ?? '' })
    }
  }

  const onSubmit = (data: FieldValues) => {
    try {
      setRegistrationData(() => ({  ...registrationData, accountDetails: data.accountDetails as Record<string, string> }))

      // console.log('registrationData After NEXT =>', registrationData)
      navigate('/preferences')
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setValue('accountDetails.dateOfBirth', registrationData.accountDetails?.dateOfBirth)
  }, [registrationData])

  const electricityPlanSummary = registrationData?.electricityQuote ? (
    <PlanSummaryCard
      planId={registrationData?.electricityQuote.quoteId ?? ''}
      planType={ELECTRICITY_VALUE}
      planBrand={registrationData?.electricityQuote.productName ?? ''}
      planLogoURL={registrationData?.electricityQuote.retailerLogo ?? ''}
      exitPenalty={registrationData?.electricityQuote?.exitPenalty}
      australianOwned={registrationData?.electricityQuote?.australianOwned}
      contractLength={registrationData?.electricityQuote?.contractLength}
      planDescription={registrationData?.electricityQuote?.mandatoryInformation ?? ''}
      planEstAnnualSaving={registrationData?.electricityQuote?.annualSavingIncGST ?? NaN}
      planLessThanCurrentPricePercent={registrationData?.electricityQuote?.percentDifference}
      planEstCostPerMonth={registrationData?.electricityQuote?.billSize}
      planEstCostPerYear={registrationData?.electricityQuote?.annualBillSize}
      fullAddress={registrationData?.fullAddress as string ?? ''}
      gasOrEnergyCode={registrationData?.nmi ?? ''}
    />
  ) : null

  const gasPlanSummary = registrationData?.gasQuote?.quoteId ? (
    <PlanSummaryCard
      planId={registrationData?.gasQuote.quoteId ?? ''}
      planType={GAS_VALUE}
      planBrand={registrationData?.gasQuote.productName ?? ''}
      planLogoURL={registrationData?.gasQuote.retailerLogo ?? ''}
      exitPenalty={registrationData?.gasQuote?.exitPenalty}
      australianOwned={registrationData?.gasQuote?.australianOwned}
      contractLength={registrationData?.gasQuote?.contractLength}
      planDescription={registrationData?.gasQuote?.mandatoryInformation ?? ''}
      planEstAnnualSaving={registrationData?.gasQuote?.annualSavingIncGST ?? NaN}
      planLessThanCurrentPricePercent={registrationData?.gasQuote?.percentDifference}
      planEstCostPerMonth={registrationData?.gasQuote?.billSize}
      planEstCostPerYear={registrationData?.gasQuote?.annualBillSize}
      fullAddress={registrationData?.fullAddress as string ?? ''}
      gasOrEnergyCode={registrationData?.mirn ?? ''}
    />
  ) : null

  return (
    <PageWrapper showLoading={getPlanData.isLoading || updatePlanData.isLoading}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12 items-center">
        <Typography variant="h1" className="text-center text-zembl-p text-3xl lg:text-5xl">
          Energy Plan Confirmation
        </Typography>
        <Typography className="text-center text-base font-normal text-zembl-p">
          Please check your plans and contact details are correct
        </Typography>
        {electricityPlanSummary}
        {gasPlanSummary}
        <AccountDetailsForm
          control={control}
          readOnly
          prefix="accountDetails"
          onSave={onFormSaved}
          saveDisabled={!!formState.errors?.accountDetails}
          defaultDate={registrationData.accountDetails ? new Date(registrationData?.accountDetails?.dateOfBirth as string) : null}
        />
        {businessDetails ? (
          <BusinessDetailsForm control={control} readOnly compactForm prefix="businessDetails" />
        ) : null}
        <ControllerCheckBox
          label="I have checked this is my correct personal and or business information"
          control={control}
          name="confirm"
          required
        />
        <PageNavigationActions nextLabel="Continue" hidePrev containerClass="w-full" />
      </form>
    </PageWrapper>
  )
}

export default ReviewPlanPage
