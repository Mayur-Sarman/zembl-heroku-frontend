import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'
import { FieldValues, useForm } from 'react-hook-form'
// import RegistrationContext from '../../contexts/RegistrationContext'
// import { useContext } from 'react'
import { Typography } from '@material-tailwind/react'
import RegistrationStep from '../../components/RegistrationStep'
import SelectedPlans from '../../components/SelectedPlans'
import { BOTH_VALUE, ELECTRICITY_VALUE, GAS_VALUE, RegistrationData } from '../../constants'
import PageNavigationActions from '../../components/PageNavigationActions'
import { useRegistration } from '../../hooks/useRegistration'
import { useToast } from '../../hooks'
import { useUpdateQuoteMutation } from '../../hooks/useUpdateQuoteMutation'
import { getJSONDateString } from '../../helpers/formatter'

const ReviewTermsPage = () => {
  const { fireAlert } = useToast()
  const { registrationData, setRegistrationData, registrationToken } = useRegistration()
  const navigate = useNavigate()

  // On load page get data from context
  const { handleSubmit, control } = useForm({ mode: 'all', defaultValues: registrationData as FieldValues })

  const updatePlanData = useUpdateQuoteMutation({
    onSuccess: (_, data) => {
      console.log(data)
      setRegistrationData((prev) => ({ ...prev, ...data.planData }))
      navigate('/thank-you')
    },
    onError: () => {
      fireAlert({ children: 'Unfortunately, we cannot update your quote.', type: 'error' })
    },
  })

  const onSubmit = (data: RegistrationData) => {
    const { businessDetails, accountDetails, electricityQuote, gasQuote } = data
    const formattedAccountDetails = { ...accountDetails, dateOfBirth: getJSONDateString(accountDetails?.dateOfBirth) }
    updatePlanData.mutate({
      planData: { businessDetails, accountDetails: formattedAccountDetails, electricityQuote, gasQuote },
      token: registrationToken ?? '',
    })

    // updatePlanData.mutate({planData: data})
    // Call API
    // Put data to context
  }

  let energyType = null
  if (registrationData?.electricityQuote && registrationData?.gasQuote) {
    energyType = BOTH_VALUE
  } else if (registrationData?.electricityQuote) {
    energyType = ELECTRICITY_VALUE
  } else if (registrationData?.gasQuote) {
    energyType = GAS_VALUE
  }

  return (
    <PageWrapper showLoading={updatePlanData.isLoading}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <RegistrationStep currentStep={4} />
        <hr className="hidden lg:block" />

        <SelectedPlans
          title="Your Acknowledgment and Acceptance"
          control={control}
          electricityPlan={registrationData?.electricityQuote}
          gasPlan={registrationData?.gasQuote}
          energyType={energyType}
        />

        <PageNavigationActions nextLabel="Submit Application" hidePrev />

        <Typography className="text-xs text-zembl-p">
          Note: By submitting this application, you acknowledge that you have read and agree to the terms and conditions
          of this offer.
        </Typography>
      </form>
    </PageWrapper>
  )
}

export default ReviewTermsPage
