import { Button, Typography } from '@material-tailwind/react'

import zemblLogo from '../../assets/zembl-icon.svg'
import { useNavigate } from 'react-router-dom'
import ReZemblForm from '../../components/Forms/PersonalDetails/ReZemblForm'
import { FieldValues, useForm } from 'react-hook-form'
import PageWrapper from '../../components/PageWrapper'
import { YES_VALUE } from '../../constants'
import { useRegistration } from '../../hooks/useRegistration'

const RegistrationThankYouPage = () => {
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm()
  const {registrationData} = useRegistration()

  const onSubmit = (data: FieldValues) => {
    if (data.reZembl === YES_VALUE) {
      if(registrationData.registrationType === 'Residential') {
        navigate('/rezembl-terms')
      } else {
        navigate('/rezembl-details')
      }
    } else {
      navigate('/rezembl-no-thank-you')
    }
  }

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12 items-center">
        <img src={zemblLogo} alt="Zembl" className="w-24 md:w-auto"></img>
        <div className="flex flex-col gap-4 max-w-screen-md">
          <Typography className="text-center text-base md:text-4xl font-normal text-zembl-p mb-4">
            Thanks for Zembling your energy rates
          </Typography>
        </div>
        <ReZemblForm control={control} />
        <Button type='submit' className="!zembl-btn m-auto w-full lg:w-1/4">
          Continue
        </Button>
      </form>
    </PageWrapper>
  )
}

export default RegistrationThankYouPage
