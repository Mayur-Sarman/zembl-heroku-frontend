import { Button, Typography } from '@material-tailwind/react'
import PageWrapper from '../../components/PageWrapper'
import { useNavigate } from 'react-router-dom'
import RegistrationStep from '../../components/RegistrationStep'

const PlanConfirmationPage = () => {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <div id="error-page" className="flex text-black flex-col gap-8 justify-center items-center py-8 px-6 sm:px-0">
        <RegistrationStep currentStep={3} />
        <Typography className="text-center text-base md:text-2xl font-normal text-zembl-p">
          Energy Plan Confirmation
        </Typography>
        <Typography className="text-center text-base font-normal text-zembl-p">
          Please hit ‘Continue’ below to receive a one time passcode so that you can review and accept the terms and
          conditions of your new energy plan
        </Typography>
      </div>
      <Button className="bg-zembl-action-primary text-zembl-p" onClick={() => navigate('/review')}>
        Submit
      </Button>
    </PageWrapper>
  )
}

export default PlanConfirmationPage
