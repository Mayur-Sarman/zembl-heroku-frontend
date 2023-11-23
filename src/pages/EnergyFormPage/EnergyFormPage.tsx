import { useEffect } from 'react'

import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import agl from '../../assets/agl.svg'
import bluenrg from '../../assets/bluenrg.svg'
import energyaustralia from '../../assets/energyaustralia.svg'
import energylocals from '../../assets/energylocals.svg'
import momentumenergy from '../../assets/momentumenergy.svg'
import nextbusinessenergy from '../../assets/nextbusinessenergy.svg'
import simplyenergy from '../../assets/simplyenergy.svg'
// import agl from '../../assets/energylocals.svg'
// import bluenrg from '../../assets/energylocals.svg'
// import energyaustralia from '../../assets/energylocals.svg'
// import energylocals from '../../assets/energylocals.svg'
// import momentumenergy from '../../assets/energylocals.svg'
// import nextbusinessenergy from '../../assets/energylocals.svg'
// import simplyenergy from '../../assets/energylocals.svg'

import { Button } from '@material-tailwind/react'

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
import { getPhoneNumber } from '../../helpers/formatter'

const HomePage = () => {
  const { createLeadMutation, validateReCaptchaMutation, registrationData, setRegistrationData } = useRegistration()
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

    const newUuid: string = (uuidv4()) + new Date().getTime()

    const buildedData = {
      ...data,
      phone: getPhoneNumber(data.phone),
      recordType: data?.registrationType === REGISTRATION_TYPE_RESIDENTIAL ? REGISTRATION_TYPE_RESIDENTIAL : SME_VALUE,
      leadHerokuId: newUuid
    }

    

    const token = await executeRecaptcha('SUBMIT_ENERGY_FORM')
    const reCaptchaValidateResponse = await validateReCaptchaMutation.mutateAsync(token)

    if (reCaptchaValidateResponse?.success) {
      // createLeadMutation.mutate(buildedData)
      console.log(buildedData)
    }
  }

  // TODO: ERROR HANDLING (EXTRACT DATA)
  useEffect(() => {
    if (createLeadMutation?.isError && createLeadMutation?.error) {
      createLeadMutation.reset()
      return
    }
  }, [createLeadMutation])

  // SUCCESS
  useEffect(() => {
    if (createLeadMutation?.isSuccess) {
      if (
        registrationData?.registrationType === REGISTRATION_TYPE_BUSINESS &&
        registrationData?.businessRegisType === ZEMBL_ASSIST_VALUE
      ) {
        navigate('/zembl-assist-upload')
      } else {
        navigate('/basic-info-1')
      }
      createLeadMutation.reset()
    }
  }, [createLeadMutation, registrationData?.registrationType, registrationData?.businessRegisType, navigate])

  useEffect(() => {
    setRegistrationData?.({} as RegistrationData)
  }, [setRegistrationData])

  useEffect(() => {
    setRegistrationData({})
  }, [])

  return (
    <PageWrapper containerClassName="bg-zembl-s" contentWrapperClassName="max-w-screen-lg">
      <Helmet>
      <script type="text/javascript" defer>
        {`window.__productReviewSettings = {
          brandId: 'f8416ed1-a744-35b1-81b9-4f03ed7a177e'
        }`}
      </script>
        
      <script src="https://cdn.productreview.com.au/assets/widgets/loader.js" async defer></script>
      <script type="text/javascript" async defer>{`
        window.__productReviewCallbackQueue = window.__productReviewCallbackQueue || [];
        window.__productReviewCallbackQueue.push(function(ProductReview) {
        ProductReview.use('reviews-carousel', {
        "container": "#pr-reviews-carousel-widget",
        "identificationDetails": {
        "type": "single",
        "strategy": "from-internal-entry-id",
        "identifier": "7ed48432-6790-3542-8e1a-a14f7ac5f66c"
        }
        });
        });`}
      </script>
      </Helmet>

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
        <Button type="submit" className="capitalize !zembl-btn w-1/3 place-self-center flex-shrink-0">
          Next
        </Button>
      </form>
      <div className="bg-grey-100 w-screen pt-16 pb-16">
      <div className="bg-grey-100">
        <div className="inline-block p-1.5"><img loading="lazy" width="200" height="90" src={bluenrg} alt="BlueNRG" /></div>
        <div className="inline-block p-1.5"><img loading="lazy" width="200" height="90" src={nextbusinessenergy} alt="NextBusinessEnergy" /></div>
        <div className="inline-block p-1.5"><img loading="lazy" width="200" height="90" src={momentumenergy} alt="Momentum" /></div>
        <div className="inline-block p-1.5"><img loading="lazy" width="200" height="90" src={simplyenergy} alt="SimplyEnergy" /></div>
      </div>
      <div>
        <div className="inline-block p-1.5"><img loading="lazy" width="200" height="90" src={agl} alt="AGL" /></div>
        <div className="inline-block p-1.5"><img loading="lazy" width="200" height="90" src={energyaustralia} alt="EnergyAustralia" /></div>
        <div className="inline-block p-1.5"><img loading="lazy" width="200" height="90" src={energylocals} alt="EnergyLocals" /></div>
      </div>
      </div>
      <div className="w-screen"><div className="m-auto w-11/12" id="pr-reviews-carousel-widget">&nbsp;</div></div>
    </PageWrapper>
  )
}

interface IGoogleReCaptchaConsumerProps {
  executeRecaptcha?: (action?: string) => Promise<string>
  container?: string | HTMLElement
}

export default HomePage
