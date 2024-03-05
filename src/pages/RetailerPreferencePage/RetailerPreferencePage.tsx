import { useNavigate } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { useRegistration } from '../../hooks/useRegistration'
import {AGL, BLUE_NRG, MOMENTUM_ENERGY, NEXT_BUSINESS_ENERGY, RESIDENTIAL_VALUE, RegistrationData, YES_VALUE } from '../../constants'
import { lazy, useEffect } from 'react'
import { PREF_RETAILERS } from '../../constants'

const PageWrapper = lazy(() => import('../../components/PageWrapper'))
const RetailerPreferenceForm = lazy(() => import('../../components/Forms/RetailerPreferenceForm'))
const RegistrationStep = lazy(() => import('../../components/RegistrationStep'))
const PageNavigationActions = lazy(() => import('../../components/PageNavigationActions'))

const RetailerPreferencePage = () => {
  const { registrationData, setRegistrationData } = useRegistration()
  const { handleSubmit, control, watch } = useForm({ defaultValues: registrationData as FieldValues, mode: 'all' })
  const navigate = useNavigate()

  const isNextPageDisabled = () => {
    let isNextDisabled = false
    if(registrationData.electricityQuote?.quotePreferences?.preferenceId != null) {
      const electricQuotePref = registrationData.electricityQuote?.quotePreferences
      const keys = Object.keys(electricQuotePref)
      keys.forEach(key => {
        if((electricQuotePref[key] != null && electricQuotePref[key] === 'No' && 
        (key !== 'greenPowerOption' 
        && key !== 'carbonNeutral' 
        && key !== 'recieveEmailBill'
        && key !== 'interestedGreenPower' 
        && (key !== 'consentBillsMonthlyBasis' || (key === 'consentBillsMonthlyBasis' && registrationData?.electricityQuote?.retailerName === BLUE_NRG))
        && (key !== 'creditCheckConsent' && registrationData?.electricityQuote?.retailerName === AGL)
        )
        )) {
          isNextDisabled = true
        }
      })
    }

    if(registrationData.gasQuote?.quotePreferences?.preferenceId != null) {
      const gasQuotePref = registrationData.gasQuote?.quotePreferences
      const keys = Object.keys(gasQuotePref)
      keys.forEach(key => {
        if((gasQuotePref[key] != null && gasQuotePref[key] === 'No' && 
        (key !== 'greenPowerOption' 
        && key !== 'carbonNeutral' 
        && key !== 'recieveEmailBill'
        && key !== 'interestedGreenPower' 
        && (key !== 'consentBillsMonthlyBasis' || (key === 'consentBillsMonthlyBasis' && registrationData?.gasQuote?.retailerName === BLUE_NRG))
        && (key !== 'creditCheckConsent' && registrationData?.electricityQuote?.retailerName === AGL)
        )
        )) {
          isNextDisabled = true;
        }
      })
    }

    return isNextDisabled
  }

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
  registrationData.lifeSupport = registrationData?.electricityQuote?.lifeSupport ?? registrationData?.gasQuote?.lifeSupport ?? ''
  registrationData.machineTypeSelected = registrationData.electricityQuote?.quotePreferences?.machineType ?? registrationData.gasQuote?.quotePreferences?.machineType ?? 
                                          registrationData.commonQuote?.quotePreferences?.machineType ?? ''
  registrationData.lifeSupportEquipment = registrationData.electricityQuote?.quotePreferences?.lifeSupportEquipment ?? registrationData.gasQuote?.quotePreferences?.lifeSupportEquipment ?? 
                                          registrationData.commonQuote?.quotePreferences?.lifeSupportEquipment ?? ''
  registrationData.nextPageDisabled = isNextPageDisabled()

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
    // console.log('registrationData =>', registrationData)
    // console.log('data =>', updatedData)
    navigate('/review-terms')
  }

  // useEffect(() => {
  //   console.log('registrationData => ', registrationData)
  //   setRegistrationData((prev) => ({
  //     ...prev,
  //     accountType: RESIDENTIAL_VALUE,
  //     billType: 'Post',
  //     electricityQuote: {
  //       ...prev.electricityQuote,
  //       retailerName: AGL,
  //     },
  //     // gasQuote: {
  //       // ...prev.gasQuote,
  //       // retailerName: MOMENTUM,
  //     // }
  //   }))
  // }, [])

  useEffect(() => {
    registrationData.toSkipPref = true
    if(PREF_RETAILERS.includes(registrationData?.electricityQuote?.retailerName ?? '') || PREF_RETAILERS.includes(registrationData?.gasQuote?.retailerName ?? '')) {
      registrationData.toSkipPref = false
    } 
    if(registrationData.electricityQuote?.retailerName === BLUE_NRG && registrationData.accountType !== RESIDENTIAL_VALUE) {
      registrationData.toSkipPref = false
    }
    if(registrationData.electricityQuote?.retailerName === NEXT_BUSINESS_ENERGY && (registrationData.lifeSupport == YES_VALUE || registrationData.accountType !== RESIDENTIAL_VALUE)) {
      registrationData.toSkipPref = false
    }
    if(registrationData.gasQuote?.retailerName === BLUE_NRG && registrationData.accountType !== RESIDENTIAL_VALUE) {
      registrationData.toSkipPref = false
    }
    if(registrationData.gasQuote?.retailerName === NEXT_BUSINESS_ENERGY && (registrationData.lifeSupport != YES_VALUE || registrationData.accountType !== RESIDENTIAL_VALUE)) {
      registrationData.toSkipPref = false
    }

    if(registrationData.toSkipPref) {
      navigate('/review-terms')
    }
  }, [])

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
            siteAddress={registrationData?.fullAddress?? ''}
            pref={registrationData?.electricityQuote?.quotePreferences as Record<string, string> ?? null}
            isElectric={true}
          />
        ) : null}

        {!showSingle && registrationData?.gasQuote ? (
          <RetailerPreferenceForm
            control={control}
            prefix="gasQuote.quotePreferences"
            retailerName={registrationData?.gasQuote?.retailerName ?? ''}
            siteAddress={registrationData?.fullAddress ?? ''}
            pref={registrationData?.gasQuote?.quotePreferences as Record<string, string> ?? null}
            isElectric={false}
          />
        ) : null}

        {showSingle ? (
          <RetailerPreferenceForm
            control={control}
            prefix="commonQuote.quotePreferences"
            retailerName={registrationData?.electricityQuote?.retailerName ?? registrationData?.gasQuote?.retailerName ?? ''}
            siteAddress={registrationData?.fullAddress ?? registrationData?.fullAddress ?? ''}
            pref={registrationData?.commonQuote?.quotePreferences as Record<string, string> ?? null}
            isElectric={true}
          />
        ) : null}

        <PageNavigationActions prevLink="/review-plan" nextDisabled={registrationData.nextPageDisabled}/>
        
      </form>
    </PageWrapper>
  )
}

export default RetailerPreferencePage
