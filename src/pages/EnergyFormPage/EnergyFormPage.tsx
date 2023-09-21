import { useEffect } from 'react'

import { useToast } from '../../hooks'
import { useForm } from 'react-hook-form'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useNavigate } from 'react-router-dom'

import { Button, Typography } from '@material-tailwind/react'

import ZemblPhoneInput from '../../components/Inputs/PhoneInput'
import PageWrapper from '../../components/PageWrapper'
import InputWithLabel from '../../components/Inputs/InputWithLabel'

import EnergyFormPageTitle from './EnergyFormPageTitle'
import {
  BUSINESS_REGISTRATION_TYPE_OPTIONS,
  REGISTRATION_TYPE_BUSINESS,
  REGISTRATION_TYPE_OPTIONS,
  REGISTRATION_TYPE_RESIDENTIAL,
  RegistrationData,
  SME_VALUE,
  ZEMBL_ASSIST_VALUE,
} from '../../constants'
import RadioCheckGroupInput from '../../components/Inputs/RadioCheckGroupInput'
import { EMAIL_VALIDATION, STANDARD_SF_TEXT_VALIDATION, REQUIRED_VALIDATION } from '../../constants/validation'
import { useRegistration } from '../../hooks/useRegistration'
import ControllerRadioGroupInput from '../../components/Inputs/ControllerRadioGroupInput'

const HomePage = () => {
  const { fireAlert } = useToast()
  const { createLeadMutation, updateLeadMutation, registrationData, setRegistrationData } = useRegistration()
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
  })
  const { executeRecaptcha }: IGoogleReCaptchaConsumerProps = useGoogleReCaptcha()
  const navigate = useNavigate()

  const typeWatcher: unknown = watch('registrationType', REGISTRATION_TYPE_BUSINESS)

  const onSubmit = async (data: Record<string, string>) => {
    if (!executeRecaptcha) return

    const buildedData = {
      ...data,
      phone: `+${data.phone}`,
      recordType: data.registrationType === REGISTRATION_TYPE_RESIDENTIAL ? REGISTRATION_TYPE_RESIDENTIAL : SME_VALUE,
    }

    const token = await executeRecaptcha('SUBMIT_ENERGY_FORM')
    console.log(token)

    // TODO: Validate Recaptcha with API
    if (!registrationData.token) {
      createLeadMutation.mutate(buildedData)
    } else {
      updateLeadMutation.mutate(buildedData)
    }
  }

  // TODO: ERROR HANDLING (EXTRACT DATA)
  useEffect(() => {
    if (createLeadMutation.isError && createLeadMutation.error) {
      console.log(createLeadMutation.error)
      fireAlert({ children: <Typography>Oops! Something has error!</Typography>, type: 'error' })
      return
    }
  }, [createLeadMutation?.isError, createLeadMutation?.error, fireAlert])

  // SUCCESS
  useEffect(() => {
    if (createLeadMutation.isSuccess) {
      if (
        registrationData.registrationType === REGISTRATION_TYPE_BUSINESS &&
        registrationData.businessRegisType === ZEMBL_ASSIST_VALUE
      ) {
        navigate('/zembl-assist-upload')
      } else {
        navigate('/basic-info-1')
      }
      createLeadMutation.reset()
    }
  }, [createLeadMutation, registrationData.registrationType, registrationData.businessRegisType, navigate])

  useEffect(() => {
    setRegistrationData({} as RegistrationData)
  }, [setRegistrationData])

  return (
    <PageWrapper containerClassName="bg-zembl-s" contentWrapperClassName="max-w-screen-lg">
      <EnergyFormPageTitle />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 md:w-1/2 ">
        <InputWithLabel
          inputLabel="First Name"
          {...register('firstName', {
            ...REQUIRED_VALIDATION,
            ...STANDARD_SF_TEXT_VALIDATION,
          })}
          errors={errors}
        />
        <InputWithLabel
          inputLabel="Last Name"
          {...register('lastName', {
            ...REQUIRED_VALIDATION,
            ...STANDARD_SF_TEXT_VALIDATION,
          })}
          errors={errors}
        />
        <InputWithLabel
          inputLabel="Email"
          {...register('email', {
            ...REQUIRED_VALIDATION,
            ...EMAIL_VALIDATION,
          })}
          errors={errors}
        />
        <ZemblPhoneInput control={control} name="phone" defaultCountry={'au'} />
        <RadioCheckGroupInput
          register={register}
          required
          options={REGISTRATION_TYPE_OPTIONS}
          name="registrationType"
          errors={errors}
        />
        <ControllerRadioGroupInput
          control={control}
          name="businessRegisType"
          hidden={typeWatcher !== REGISTRATION_TYPE_BUSINESS}
          options={BUSINESS_REGISTRATION_TYPE_OPTIONS}
          optionsContainerClassName="md:flex-nowrap"
          buttonContainerClassName="w-full md:w-1/2 bg-zembl-s1"
        />
        <Button type="submit" className="!zembl-btn w-1/3 place-self-center flex-shrink-0">
          Next
        </Button>
      </form>
    </PageWrapper>
  )
}

interface IGoogleReCaptchaConsumerProps {
  executeRecaptcha?: (action?: string) => Promise<string>
  container?: string | HTMLElement
}

export default HomePage
