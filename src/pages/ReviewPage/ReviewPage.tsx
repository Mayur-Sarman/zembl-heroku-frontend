import PageWrapper from '../../components/PageWrapper'
import RegistrationStep from '../../components/RegistrationStep'
import { useContext } from 'react'
import RegistrationContext from '../../contexts/RegistrationContext'
import { useForm } from 'react-hook-form'
import SelectedPlans from '../../components/SelectedPlans'
import { Button, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

const ReviewPage = () => {
  const navigate = useNavigate()
  const { registrationData } = useContext(RegistrationContext)

  // On load page get data from context
  const { handleSubmit, register, control } = useForm()

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data)

    console.log(registrationData)
    // Call API
    // Put data to context
    navigate('/thankyou')
  }

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
        <div className="lg:h-32 lg:py-3 lg:px-14 lg:mt-6">
          <div className="hidden lg:block">
            <RegistrationStep currentStep={3} />
          </div>
        </div>
        <hr className="hidden lg:block" />
        <SelectedPlans
          title="Your Plans"
          onEditClick={() => console.log('Edit')}
          register={register}
          control={control}
        />

        <Button type="submit" className="!zembl-btn">
          Submit Application
        </Button>
        <Typography className="text-xs text-zembl-p">
          Note: By submitting this application, you acknowledge that you have read and agree to the terms and conditions
          of this offer.
        </Typography>
      </form>
    </PageWrapper>
  )
}

export default ReviewPage
