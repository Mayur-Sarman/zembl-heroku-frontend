import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'
import { FieldValues, useForm } from 'react-hook-form'
import RegistrationStep from '../../components/RegistrationStep'
import PageNavigationActions from '../../components/PageNavigationActions'
import { useRegistration } from '../../hooks/useRegistration'
import RetailerPreferenceForm from '../../components/Forms/RetailerPreferenceForm'
import {RegistrationData } from '../../constants'
import { useEffect } from 'react'
// import { SIMPLY_ENERGY } from '../../constants'

const RetailerPreferencePage = () => {
  const { registrationData, setRegistrationData } = useRegistration()
  const { handleSubmit, control, watch } = useForm({ defaultValues: registrationData as FieldValues, mode: 'all' })
  const navigate = useNavigate()
  registrationData.electricityQuote = {
    ...registrationData.electricityQuote,
    quotePreferences: watch('electricityQuote.quotePreferences') as Record<string, string>
  }
  registrationData.gasQuote = {
    ...registrationData.gasQuote,
    quotePreferences: watch('gasQuote.quotePreferences') as Record<string, string>
  }
  registrationData.commonQuote = {
    ...registrationData.commonQuote,
    quotePreferences: watch('commonQuote.quotePreferences') as Record<string, string>
  }
  
  
  const onSubmit = (data: RegistrationData) => {
    const commonPreferences = (data?.commonQuote)?.quotePreferences
    const updatedData = commonPreferences
      ? {
          ...data,
          electricityQuote: { ...data.electricityQuote, quotePreferences: {...commonPreferences, preferenceId: registrationData.electricityQuote?.quotePreferences?.preferenceId} },
          gasQuote: { ...data.gasQuote, quotePreferences: {...commonPreferences, preferenceId: registrationData.gasQuote?.quotePreferences?.preferenceId} },
        }
      : data
      
    setRegistrationData((prev) => ({ ...prev, ...updatedData }))
    navigate('/review-terms')
  }

  useEffect(() => {
    setRegistrationData((prev) => ({
      ...prev,
      // accountType: 'SME',
      electricityQuote: {
        ...prev.electricityQuote,
        // retailerName: SIMPLY_ENERGY,
      },
      gasQuote: {
        ...prev.gasQuote,
        // retailerName: MOMENTUM,
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
            pref={registrationData?.electricityQuote?.quotePreferences as Record<string, string> ?? null}
          />
        ) : null}

        {!showSingle && registrationData?.gasQuote ? (
          <RetailerPreferenceForm
            control={control}
            prefix="gasQuote.quotePreferences"
            retailerName={registrationData?.gasQuote?.retailerName ?? ''}
            siteAddress={registrationData?.gasQuote?.address ?? ''}
            pref={registrationData?.gasQuote?.quotePreferences as Record<string, string> ?? null}
          />
        ) : null}

        {showSingle ? (
          <RetailerPreferenceForm
            control={control}
            prefix="commonQuote.quotePreferences"
            retailerName={registrationData?.electricityQuote?.retailerName ?? registrationData?.gasQuote?.retailerName ?? ''}
            siteAddress={registrationData?.electricityQuote?.address ?? registrationData?.gasQuote?.address ?? ''}
            pref={registrationData?.commonQuote?.quotePreferences as Record<string, string> ?? null}
          />
        ) : null}

        <PageNavigationActions prevLink="/review-plan" />
      </form>
    </PageWrapper>
  )
}

export default RetailerPreferencePage
