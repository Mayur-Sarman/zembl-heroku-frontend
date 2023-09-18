import { useEffect } from 'react'

import { useModal, useToast } from '../../hooks'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useNavigate } from 'react-router-dom'

import { Button } from '@material-tailwind/react'

import ZemblPhoneInput from '../../components/Inputs/PhoneInput'
import PageWrapper from '../../components/PageWrapper'
import InputWithLabel from '../../components/Inputs/InputWithLabel'

import EnergyFormPageTitle from './EnergyFormPageTitle'
// import { extractAddressComponent } from '../../helpers/googleMap'
import RadioGroupInput from '../../components/Inputs/RadioGroupInput'
import {
  BUSINESS_REGISTRATION_TYPE_OPTIONS,
  REGISTRATION_TYPE_BUSINESS,
  REGISTRATION_TYPE_OPTIONS,
  REGISTRATION_TYPE_RESIDENTIAL,
} from '../../constants'
import RadioCheckGroupInput from '../../components/Inputs/RadioCheckGroupInput'
import { EMAIL_VALIDATION, STANDARD_SF_TEXT_VALIDATION, REQUIRED_VALIDATION } from '../../constants/validation'

const FORM_DEFAULT_VALUE: FieldValues = {
  registrationType: null,
}

const HomePage = () => {
  const { fireAlert } = useToast()
  const { openModal } = useModal()
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: FORM_DEFAULT_VALUE,
    mode: 'all',
  })
  const { executeRecaptcha }: IGoogleReCaptchaConsumerProps = useGoogleReCaptcha()
  const navigate = useNavigate()

  const typeWatcher: unknown = watch('registrationType', REGISTRATION_TYPE_BUSINESS)

  const onSubmit = async (data: Record<string, string>) => {
    console.log(data)
    // console.log(extractAddressComponent(data?.googleAddress as google.maps.places.PlaceResult))
    // if (data) return
    if (!executeRecaptcha) return

    const token = await executeRecaptcha('SUBMIT_ENERGY_FORM')
    console.log(token)

    navigate('/basic-info-1')
  }

  useEffect(() => {
    // fireAlert({ children: <Typography>Test</Typography>, type: 'error' })
    // fireAlert({ children: <Typography>TestTEasdfasdf</Typography>, type: 'error', icon: <ExclamationCircleIcon width={25} height={25} /> })
    // openModal({ open: true, content: <Typography>Test</Typography>, dismissible: true })
    // throw new Error("Test");
  }, [fireAlert, openModal])

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
        <ZemblPhoneInput control={control} name="phone" required defaultCountry={'au'} />
        <RadioCheckGroupInput
          register={register}
          required
          options={REGISTRATION_TYPE_OPTIONS}
          name="registrationType"
          errors={errors}
        />
        <Controller
          control={control}
          name="businessRegisType"
          rules={{ required: { value: true, message: 'Select a value' } }}
          render={({ field, fieldState }) => {
            if (typeWatcher === REGISTRATION_TYPE_RESIDENTIAL) return <></>
            return (
              <RadioGroupInput
                {...field}
                values={[field.value]}
                error={fieldState.error}
                options={BUSINESS_REGISTRATION_TYPE_OPTIONS}
                optionsContainerClassName="md:flex-nowrap"
                buttonContainerClassName="w-full md:w-1/2 bg-zembl-s1"
              />
            )
          }}
        />
        <Button type="submit" className="!zembl-btn w-1/3 place-self-center flex-shrink-0">
          Save
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
