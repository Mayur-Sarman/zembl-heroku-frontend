import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import BasicBusinessDetailsForm from '../../../components/Forms/BasicInfos/BasicBusinessDetailsForm'
import EnergyTypeForm from '../../../components/Forms/BasicInfos/EnergyTypeForm'
import EnergySpendForm from '../../../components/Forms/BasicInfos/EnergySpendForm'
import PageNavigationActions from '../../../components/PageNavigationActions'

const BasicInfoPage1 = () => {
  // On load page get data from context
  const { handleSubmit, control, watch } = useForm({ mode: 'all' })
  const navigate = useNavigate()

  const billingType: unknown = watch<string>('billingType', '')
  const isMoving: unknown = watch<string>('isMoving', false)

  const onSubmit = (e: FieldValues) => {
    console.log(e)

    // Call API
    // Put data to context
    navigate('/basic-info-2')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
      <BasicBusinessDetailsForm control={control} />
      <EnergyTypeForm control={control} isMoving={isMoving as string} />
      <EnergySpendForm control={control} billingType={billingType as string} />

      <PageNavigationActions prevLink="/" />
    </form>
  )
}

export default BasicInfoPage1
