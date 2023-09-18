import { useForm } from 'react-hook-form'

import RegistrationStep from '../../../components/RegistrationStep'
import { useNavigate } from 'react-router-dom'
import PageNavigationActions from '../../../components/PageNavigationActions'
import SolarForm from '../../../components/Forms/BasicInfos/SolarForm'
import BasicLifeSupportForm from '../../../components/Forms/BasicInfos/BasicLifeSupportForm'
import BillAndMessageForm from '../../../components/Forms/BasicInfos/BillAndMessageForm'
import { REQUIRED_VALIDATION } from '../../../constants/validation'
import ControllerPreferencesSelector from '../../../components/Inputs/ControllerPreferencesSelector'

const BasicInfoPage2 = () => {
  // On load page get data from context
  const { handleSubmit, control } = useForm({})
  const navigate = useNavigate()

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data)

    // Call API
    // Put data to context
    navigate('/bill-upload')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
      <RegistrationStep currentStep={0} />
      <hr className="hidden lg:block" />

      <BillAndMessageForm control={control} />
      <BasicLifeSupportForm control={control} />
      <SolarForm control={control} />
      <ControllerPreferencesSelector name={'preferences'} control={control} rules={REQUIRED_VALIDATION} />

      <PageNavigationActions prevLink="/basic-info-1" />
    </form>
  )
}

export default BasicInfoPage2
