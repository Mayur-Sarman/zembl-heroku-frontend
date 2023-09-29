import { useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'
// import SecondaryAccountHolderForm from '../../../components/Forms/PersonalDetails/SecondaryAccountHolderForm'
import PageNavigationActions from '../../../components/PageNavigationActions'
// import AGLPersonalDetailsForm from '../../../components/Forms/RetailerAdditionalDetails/AGLPersonalDetailsForm'
// import { YES_VALUE } from '../../../constants'
// import LifeSupportForm from '../../../components/Forms/PersonalDetails/LifeSupportForm'
// import ReZemblForm from '../../../components/Forms/PersonalDetails/ReZemblForm'

const PersonalDetailPage2 = () => {
  // On load page get data from context
  const {
    handleSubmit,
    // control, watch
  } = useForm()
  const navigate = useNavigate()

  // const hasSecondaryAccountHolder = watch<string>('hasSecondaryAccountHolder', '') as string

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data)

    // Call API
    // Put data to context
    navigate('/plan-confirmation')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
      {/* <SecondaryAccountHolderForm
        control={control}
        hasSecondaryAccountHolder={hasSecondaryAccountHolder === YES_VALUE}
      /> */}
      {/* <AGLPersonalDetailsForm  control={control} hasSecondaryContact={hasSecondaryAccountHolder} /> */}
      <PageNavigationActions prevLink="/personal-detail-1" />
    </form>
  )
}

export default PersonalDetailPage2
