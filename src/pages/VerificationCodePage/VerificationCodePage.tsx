import { Typography } from '@material-tailwind/react'
import PageWrapper from '../../components/PageWrapper'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AccordionCard from '../../components/AccordionCard'
import { useCallback, useContext, useState } from 'react'
import RegistrationContext from '../../contexts/RegistrationContext'
import { FieldValues, useForm } from 'react-hook-form'
import VerificationCodeInput from '../../components/Inputs/VerificationCodeInput'
import PageNavigationActions from '../../components/PageNavigationActions'
import { ValidateTokenResponse } from '../../api/quote'

import { useValidateTokenQuery } from '../../hooks/useValidateTokenQuery'
import { useValidateOTPMutation } from '../../hooks/useValidateOTPMutation'
import { useResendOTPMutation } from '../../hooks/useResendOTPMutation'
import { ZEMBL_DEBUG_MODE } from '../../constants/misc'

const VerificationCodePage = () => {
  const { registrationData, setRegistrationToken, setRegistrationData, handleErrorResponse } =
    useContext(RegistrationContext)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [otpDigits, setOtpDigits] = useState<number>(4)

  const validateToken = useValidateTokenQuery(token, {
    onSuccess: (data: ValidateTokenResponse) => {
      setOtpDigits(data.otpDigit ?? 4)
      setRegistrationData((prev) => ({ ...prev, quoteToken: token }))
    },
    onError: (error) => {
      if (ZEMBL_DEBUG_MODE) console.log('VERIFICATION_CODE_PAGE', error)
      handleErrorResponse(error, 'The link is invalid or expired.')
    },
  })

  const resendOTP = useResendOTPMutation(token, {
    onError: (error) => {
      handleErrorResponse(error, 'Could not send an OTP code, please try again later')
    },
  })

  const validateOTP = useValidateOTPMutation(token, {
    onSuccess: (data) => {
      setRegistrationToken(data.accessToken)
      navigate('/review-plan')
    },
    onError: (error) => {
      handleErrorResponse(error, 'OTP code is invalid or expired.')
    },
  })

  // On load page get data from context
  const { handleSubmit, control, setValue, formState } = useForm({ mode: 'all' })

  const onResendClick = useCallback(() => {
    resendOTP.mutate()
  }, [resendOTP])

  const onSubmit = (data: FieldValues) => {
    console.log(data)
    validateOTP.mutate(data?.otpCode as string)
  }

  const isPageLoading = validateOTP.isLoading || resendOTP.isLoading || validateToken.isLoading

  return (
    <PageWrapper showLoading={isPageLoading}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
        <Typography variant="h1" className="text-center text-zembl-p text-3xl lg:text-5xl">
          Energy Plan Confirmation
        </Typography>
        <Typography className="text-center text-base font-normal text-zembl-p">
          Please enter the verification code below to continue with the plans you have selected
        </Typography>
        <AccordionCard open alwaysOpen title="Verification Code" bodyClassName="flex flex-col">
          <VerificationCodeInput
            name="otpCode"
            control={control}
            setValue={setValue}
            phoneNumber={registrationData?.phone ?? registrationData?.mobile ?? ''}
            onResendClicked={onResendClick}
            digits={otpDigits}
          />
          <PageNavigationActions hidePrev nextDisabled={!formState.isValid} />
        </AccordionCard>
      </form>
    </PageWrapper>
  )
}

export default VerificationCodePage
