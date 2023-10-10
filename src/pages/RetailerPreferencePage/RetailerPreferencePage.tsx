import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'
import { FieldValues, useForm } from 'react-hook-form'
import RegistrationStep from '../../components/RegistrationStep'
import PageNavigationActions from '../../components/PageNavigationActions'
import { useRegistration } from '../../hooks/useRegistration'
import RetailerPreferenceForm from '../../components/Forms/RetailerPreferenceForm'
import { AGL, BLUE_NRG, RegistrationData } from '../../constants'
import { Quote } from '../../api/quote'
import { useEffect } from 'react'

const RetailerPreferencePage = () => {
  const { registrationData, setRegistrationData } = useRegistration()
  const { handleSubmit, control } = useForm({ defaultValues: registrationData as FieldValues, mode: 'all' })
  const navigate = useNavigate()

  const onSubmit = (data: RegistrationData) => {
    const commonPreferences = (data?.commonQuote as Quote)?.quotePreferences
    const updatedData = commonPreferences
      ? {
          ...data,
          electricityQuote: { ...data.electricityQuote, quotePreferences: commonPreferences },
          gasQuote: { ...data.gasQuote, quotePreferences: commonPreferences },
        }
      : data
    console.log(updatedData)
    setRegistrationData((prev) => ({ ...prev, ...updatedData }))
    navigate('/review-terms')
  }

  useEffect(() => {
    setRegistrationData((prev) => ({
      ...prev,
      electricityQuote: {
        ...prev.electricityQuote,
        retailerName: AGL,
      },
      gasQuote: {
        ...prev.gasQuote,
        retailerName: BLUE_NRG,
      },
    }))
  }, [setRegistrationData])

  const showSingle = registrationData?.electricityQuote?.retailerName === registrationData?.gasQuote?.retailerName
  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <RegistrationStep currentStep={3} />
        <hr className="hidden lg:block" />

        {!showSingle && registrationData?.electricityQuote ? (
          <RetailerPreferenceForm
            control={control}
            prefix="electricityQuote.quotePreferences"
            retailerName={registrationData?.electricityQuote?.retailerName ?? ''}
            siteAddress={registrationData?.electricityQuote?.address ?? ''}
          />
        ) : null}

        {!showSingle && registrationData?.gasQuote ? (
          <RetailerPreferenceForm
            control={control}
            prefix="gasQuote.quotePreferences"
            retailerName={registrationData?.gasQuote?.retailerName ?? ''}
            siteAddress={registrationData?.gasQuote?.address ?? ''}
          />
        ) : null}

        {showSingle ? (
          <RetailerPreferenceForm
            control={control}
            prefix="commonQuote.quotePreferences"
            retailerName={registrationData?.electricityQuote?.retailerName ?? ''}
            siteAddress={registrationData?.electricityQuote?.address ?? ''}
          />
        ) : null}

        <PageNavigationActions prevLink="/review-plan" />
      </form>
    </PageWrapper>
  )
}

export default RetailerPreferencePage
