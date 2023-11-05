import { FieldValues, useForm } from 'react-hook-form'

import RegistrationStep from '../../../components/RegistrationStep'
import { useNavigate } from 'react-router-dom'
import PageNavigationActions from '../../../components/PageNavigationActions'
import SolarForm from '../../../components/Forms/BasicInfos/SolarForm'
import BasicLifeSupportForm from '../../../components/Forms/BasicInfos/BasicLifeSupportForm'
import BillAndMessageForm from '../../../components/Forms/BasicInfos/BillAndMessageForm'
import { REQUIRED_VALIDATION } from '../../../constants/validation'
import ControllerPreferencesSelector from '../../../components/Inputs/ControllerPreferencesSelector'
import { useRegistration } from '../../../hooks/useRegistration'
import { LEAD_STATUS_CONVERTED_WON } from '../../../constants'
import { Site } from '../../../api/site'
import { convertPreference } from '../../../api/common'
import { ZEMBL_DEBUG_MODE } from '../../../constants/misc'

const BasicInfoPage2 = () => {
  const { registrationData, updateLeadMutation, createSiteMutation, setRegistrationData  } = useRegistration()
  // On load page get data from context
  const { handleSubmit, control, watch } = useForm({ defaultValues: registrationData as FieldValues, mode: 'all' })
  const navigate = useNavigate()

  const [
    solar,
  ]: string[] = watch([
    'solar',
  ]) as string[]

  const onSubmit = async (data: FieldValues) => {
    // Call API
    const lead = { id: (data?.leadId as string) ?? '', status: LEAD_STATUS_CONVERTED_WON }

    try {
      const leadConvertResult = await updateLeadMutation.mutateAsync(lead)
      const leadId = leadConvertResult?.processLeadOutput?.id ?? null

      const selectedPreferences: string[] = (data?.preferenceList as string[]) ?? []
      const siteData: Site = {
        leadId: leadId,
        gas: !!data?.gas,
        electricity: !!data?.electricity,
        siteType: data?.recordType as string,
        billType: data?.billType as string,
        lifeSupport: data?.lifeSupport as string,
        solar: data?.solar as string,
        solarConsideration: data?.solarConsideration as string,
        preferences: convertPreference(selectedPreferences),
      }
      const createSiteResult = await createSiteMutation.mutateAsync(siteData)

      setRegistrationData((value) => {
        const mergedValue = {
          ...value,
          ...siteData,
          ...createSiteResult?.processSiteOutput,
          preferenceList: selectedPreferences,
          leadId: leadId,
        }

        return mergedValue
      })
      navigate('/bill-upload')
    } catch (error) {
      if (ZEMBL_DEBUG_MODE) console.log('BASIC_INFO_2_SUBMIT_ERROR:', error)
    } finally {
      updateLeadMutation.reset()
      createSiteMutation.reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
      <RegistrationStep currentStep={0} />
      <hr className="hidden lg:block" />

      <BillAndMessageForm control={control} />
      <BasicLifeSupportForm control={control} />
      <SolarForm control={control} solar={solar}/>
      <ControllerPreferencesSelector name={'preferenceList'} control={control} rules={REQUIRED_VALIDATION} />

      <PageNavigationActions prevLink="/basic-info-1" />
    </form>
  )
}

export default BasicInfoPage2
