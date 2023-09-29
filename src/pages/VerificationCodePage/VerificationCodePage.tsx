import { Typography } from '@material-tailwind/react'
import PageWrapper from '../../components/PageWrapper'
import { useNavigate } from 'react-router-dom'
import AccordionCard from '../../components/AccordionCard'
import { useCallback, useContext } from 'react'
import RegistrationContext from '../../contexts/RegistrationContext'
import { useForm } from 'react-hook-form'
import VerificationCodeInput from '../../components/Inputs/VerificationCodeInput'
import PageNavigationActions from '../../components/PageNavigationActions'

const VerificationCodePage = () => {
  const { registrationData } = useContext(RegistrationContext)
  const navigate = useNavigate()

  // On load page get data from context
  const { handleSubmit, control, setValue, formState } = useForm()

  const onResendClick = useCallback(() => {
    console.log(registrationData.phoneNumber)
  }, [registrationData.phoneNumber])

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data)

    navigate('/review-plan')
    // Call API
    // Put data to context
  }

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <Typography variant="h1" className="text-center text-zembl-p text-3xl lg:text-5xl">
          Energy Plan Confirmation
        </Typography>
        <Typography className="text-center text-base font-normal text-zembl-p">
          Please enter the verification code below to continue with the plans you have selected
        </Typography>
        <AccordionCard open alwaysOpen title="Verification Code" bodyClassName="flex flex-col">
          <VerificationCodeInput
            control={control}
            setValue={setValue}
            phoneNumber={registrationData.phone ?? ''}
            onResendClicked={onResendClick}
          />
          <PageNavigationActions hidePrev nextDisabled={!formState.isValid} />
        </AccordionCard>
      </form>
    </PageWrapper>
  )
}

export default VerificationCodePage
