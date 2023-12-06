import { useNavigate } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { useRegistration } from '../../hooks/useRegistration'
import {RegistrationData } from '../../constants'
import { lazy } from 'react'
// import { useEffect } from 'react'
// import { MOMENTUM } from '../../constants'

const PageWrapper = lazy(() => import('../../components/PageWrapper'))
const RetailerPreferenceForm = lazy(() => import('../../components/Forms/RetailerPreferenceForm'))
const RegistrationStep = lazy(() => import('../../components/RegistrationStep'))
const PageNavigationActions = lazy(() => import('../../components/PageNavigationActions'))

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

  registrationData.accountType = registrationData?.electricityQuote?.accountType ?? registrationData?.gasQuote?.accountType ?? ''
  registrationData.billType = registrationData?.electricityQuote?.billType ?? registrationData?.gasQuote?.billType ?? ''

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

  // useEffect(() => {
  //   registrationData.nextPage = false;
  //   setRegistrationData((prev) => ({
  //     ...prev,
  //     // accountType: 'SME',
  //     electricityQuote: {
  //       ...prev.electricityQuote,
  //       retailerName: '',
  //     },
  //     gasQuote: {
  //       ...prev.gasQuote,
  //       // retailerName: MOMENTUM,
  //     }
  //   }))
  // }, [])

  // useEffect(() => {
    // if(registrationData.electricityQuote?.quotePreferences?.preferenceId != null) {
    //   for (const [key, value] of Object.entries(registrationData.electricityQuote.quotePreferences)) {
    //     console.log(`${key}: ${value}`);
    //   }
    // }
    

  //   console.log('registrationData.nextPage', registrationData.nextPage)
  // }, [registrationData.gasQuote, registrationData.electricityQuote])

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
