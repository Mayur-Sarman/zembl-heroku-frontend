import { FieldValues, useForm } from 'react-hook-form'

// import { useNavigate } from 'react-router-dom'
// import { REQUIRED_VALIDATION } from '../../../constants/validation'
// import { useRegistration } from '../../../hooks/useRegistration'
// import { LEAD_STATUS_CONVERTED_WON } from '../../../constants'
// import { Site } from '../../../api/site'
// import { convertPreference } from '../../../api/common'
// import { ZEMBL_DEBUG_MODE } from '../../../constants/misc'
import { lazy } from 'react'

// const RegistrationStep = lazy(() => import('../../../components/RegistrationStep'))
// const PageNavigationActions = lazy(() => import('../../../components/PageNavigationActions'))
// const SolarForm = lazy(() => import('../../../components/Forms/BasicInfos/SolarForm'))
// const BasicLifeSupportForm = lazy(() => import('../../../components/Forms/BasicInfos/BasicLifeSupportForm'))
const BillAndMessageForm = lazy(() => import('../../../components/Forms/BasicInfos/BillAndMessageForm'))
// const ControllerPreferencesSelector = lazy(() => import('../../../components/Inputs/ControllerPreferencesSelector'))

const BasicInfoPage2 = () => {
  // const { registrationData, updateLeadMutation, createSiteMutation, setRegistrationData  } = useRegistration()
  // On load page get data from context
  const { handleSubmit, control } = useForm({ mode: 'all' })
  // const navigate = useNavigate()

  // const [
  //   solar,
  // ]: string[] = watch([
  //   'solar',
  // ]) as string[]

  const onSubmit = (data: FieldValues) => {
    console.log(data)
    // Call API
    // const lead = { id: (data?.leadId as string) ?? '', status: LEAD_STATUS_CONVERTED_WON }

    // try {
    //   const leadConvertResult = await updateLeadMutation.mutateAsync(lead)
    //   const leadId = leadConvertResult?.processLeadOutput?.id ?? null

    //   const selectedPreferences: string[] = (data?.preferenceList as string[]) ?? []
    //   const siteData: Site = {
    //     leadId: leadId,
    //     gas: !!data?.gas,
    //     electricity: !!data?.electricity,
    //     siteType: data?.recordType as string,
    //     billType: data?.billType as string,
    //     lifeSupport: data?.lifeSupport as string,
    //     solar: data?.solar as string,
    //     solarConsideration: data?.solarConsideration as string,
    //     preferences: convertPreference(selectedPreferences),
    //     ...registrationData?.address as Record<string, string>
    //   }
    //   const createSiteResult = await createSiteMutation.mutateAsync(siteData)

    //   setRegistrationData((value) => {
    //     const mergedValue = {
    //       ...value,
    //       ...siteData,
    //       ...createSiteResult?.processSiteOutput,
    //       preferenceList: selectedPreferences,
    //       leadId: leadId,
    //     }

    //     return mergedValue
    //   })
    //   navigate('/bill-upload')
    // } catch (error) {
    //   if (ZEMBL_DEBUG_MODE) console.log('BASIC_INFO_2_SUBMIT_ERROR:', error)
    // } finally {
    //   updateLeadMutation.reset()
    //   createSiteMutation.reset()
    // }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      {/* <RegistrationStep currentStep={0} />
      <hr className="hidden lg:block" /> */}

      <BillAndMessageForm control={control} />
      {/* <BasicLifeSupportForm control={control} /> */}
      {/* <SolarForm control={control} solar={solar}/>
      <ControllerPreferencesSelector name={'preferenceList'} control={control} rules={REQUIRED_VALIDATION} />

      <PageNavigationActions prevLink="/basic-info-1" /> */}
    </form>
  )
}

export default BasicInfoPage2
