import { Button, Typography } from '@material-tailwind/react'
import PageWrapper from '../../components/PageWrapper'
import { useNavigate } from 'react-router-dom'

const PlanConfirmationPage = () => {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <div className="flex text-black flex-col gap-8 justify-center items-center py-8 px-6 sm:px-0 w-full md:w-10/12">
        <Typography variant="h4" className="text-center md:text-4xl lg:text-5xl text-zembl-p">
          Energy Plan Confirmation
        </Typography>
        <Typography className="text-center text-base font-normal text-zembl-p">
          Please hit ‘Continue’ below to receive a one time passcode so that you can review and accept the terms and
          conditions of your new energy plan
        </Typography>
      </div>
      <Button className="!zembl-btn md:w-1/3" onClick={() => navigate('/verification-code')}>
        Continue
      </Button>
    </PageWrapper>
  )
}

export default PlanConfirmationPage
