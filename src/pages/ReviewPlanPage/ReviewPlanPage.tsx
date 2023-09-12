import { useNavigate } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'
import { useForm } from 'react-hook-form'
import RegistrationContext from '../../contexts/RegistrationContext'
import { useContext } from 'react'
import { Button, Checkbox, Typography } from '@material-tailwind/react'
import { ELECTRICITY_VALUE, GAS_VALUE } from '../../constants'
import PlanSummaryCard from '../../components/PlanSummaryCard'
import AccountDetailsForm from '../../components/Forms/PersonalDetails/AccountDetailsForm'
import BusinessDetailsForm from '../../components/Forms/PersonalDetails/BusinessDetailsForm'

const ReviewPlanPage = () => {
  const { registrationData } = useContext(RegistrationContext)
  const navigate = useNavigate()

  // On load page get data from context
  const { handleSubmit, control, register } = useForm()

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data)

    navigate('/preferences')
    // Call API
    // Put data to context
  }

  const electricityPlanSummary =
    registrationData.energyType.energyType !== GAS_VALUE ? (
      <PlanSummaryCard
        planId="test"
        planType={ELECTRICITY_VALUE}
        fullAddress="5/100 William Street, Woolloomooloo NSW 2011"
        gasOrEnergyCode="41234512834"
      />
    ) : null

  const gasPlanSummary =
    registrationData.energyType.energyType !== ELECTRICITY_VALUE ? (
      <PlanSummaryCard
        planId="test"
        planType={GAS_VALUE}
        fullAddress="5/100 William Street, Woolloomooloo NSW 2011"
        gasOrEnergyCode="41234512834"
      />
    ) : null

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12 items-center">
        <Typography variant="h1" className="text-center text-zembl-p text-3xl lg:text-5xl">
          Energy Plan Confirmation
        </Typography>
        <Typography className="text-center text-base font-normal text-zembl-p">
          Please check your plans and contact details are correct
        </Typography>
        {electricityPlanSummary}
        {gasPlanSummary}
        <AccountDetailsForm control={control} register={register} readOnly />
        <BusinessDetailsForm register={register} readOnly compactForm />
        <Checkbox
          label="I have checked this is my correct personal and or business information"
          {...register('confirm')}
          crossOrigin={''}
        />
        <Button type="submit" className="!zembl-btn w-2/3 md:w-1/4">
          Continue
        </Button>
      </form>
    </PageWrapper>
  )
}

export default ReviewPlanPage
