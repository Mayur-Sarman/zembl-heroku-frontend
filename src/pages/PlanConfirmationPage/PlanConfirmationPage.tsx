import { Button, Typography } from '@material-tailwind/react'
import PageWrapper from '../../components/PageWrapper'
import { useRegistration } from '../../hooks/useRegistration'
import { useEffect } from 'react'
import { useToast } from '../../hooks'
import { ZEMBL_PHONE_NUMBER } from '../../constants/misc'

const PlanConfirmationPage = () => {
  const { fireAlert } = useToast()
  const { sendQuoteEmailMutation, registrationData } = useRegistration()

  const performVerify = () => {
    sendQuoteEmailMutation.mutate()
  }

  const sendEmailMessageDisplay = sendQuoteEmailMutation?.isSuccess ? (
    <>
      <Typography color="green">
        The code has been sent to your {registrationData?.billType ?? ''}! Please check your email for verification link.
      </Typography>
      <div className='flex gap-1'>
        <Typography
          onClick={performVerify}
          variant="small"
          className="text-sm lg:text-base underline cursor-pointer text-gray-400 hover:text-gray-600 focus:text-gray-600 active:text-gray-600"
        >
          {`Didn't receive the email? Click here to resend `}
        </Typography>
        <Typography className="text-zembl-p">{`or call us at ${ZEMBL_PHONE_NUMBER}`}</Typography>
      </div>
    </>
  ) : null

  const continueButton = sendQuoteEmailMutation?.isSuccess ? null : (
    <Button className="!zembl-btn md:w-1/3" onClick={performVerify}>
      Continue
    </Button>
  )

  useEffect(() => {
    if (sendQuoteEmailMutation?.isError) {
      fireAlert({ children: 'We could not process your request at the moment, please try again later.', type: 'error' })
    }
  }, [sendQuoteEmailMutation?.isError, fireAlert])

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
      {sendEmailMessageDisplay}
      {continueButton}
    </PageWrapper>
  )
}

export default PlanConfirmationPage
