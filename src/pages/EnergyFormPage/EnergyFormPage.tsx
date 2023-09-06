import { useEffect } from 'react'

import { useModal, useToast } from '../../hooks'
import { useForm } from 'react-hook-form'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useNavigate } from 'react-router-dom'

import { Button, Radio } from '@material-tailwind/react'
import { CheckIcon } from '@heroicons/react/20/solid'

import ZemblPhoneInput from '../../components/Inputs/PhoneInput'
import PageWrapper from '../../components/PageWrapper'
import InputWithLabel from '../../components/Inputs/InputWithLabel'

import EnergyFormPageTitle from './EnergyFormPageTitle'
import { GOOGLE_RECAPTCHA_KEY } from '../../constants'

const HomePage = () => {
  const { fireAlert } = useToast()
  const { openModal } = useModal()
  const { register, handleSubmit, control, watch } = useForm()
  const { executeRecaptcha }: IGoogleReCaptchaConsumerProps = useGoogleReCaptcha()
  const navigate = useNavigate()

  const typeWatcher: unknown = watch('type', 'business')

  const onSubmit = async (data: Record<string, string>) => {
    console.log(data)
    if (!executeRecaptcha) return

    const token = await executeRecaptcha('SUBMIT_ENERGY_FORM')
    console.log(token)
  }

  useEffect(() => {
    // fireAlert({ children: <Typography>Test</Typography>, type: 'error' })
    // fireAlert({ children: <Typography>TestTEasdfasdf</Typography>, type: 'error', icon: <ExclamationCircleIcon width={25} height={25} /> })
    // openModal({ open: true, content: <Typography>Test</Typography>, dismissible: true })
    // throw new Error("Test");
  }, [fireAlert, openModal])

  return (
    <GoogleReCaptchaProvider reCaptchaKey={GOOGLE_RECAPTCHA_KEY}>
      <PageWrapper containerClassName="bg-zembl-s" contentWrapperClassName="max-w-screen-lg">
        <EnergyFormPageTitle />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 md:w-1/2 ">
          <InputWithLabel className="bg-white" inputLabel="First Name" {...register('firstName')} />
          <InputWithLabel className="bg-white" inputLabel="Last Name" {...register('lastName')} />
          <InputWithLabel className="bg-white" inputLabel="Email" {...register('email')} />
          <ZemblPhoneInput control={control} name="phone" required defaultCountry={'au'} />
          <div className="flex gap-3 justify-center">
            <Radio
              label="Business"
              labelProps={{ className: 'text-sm' }}
              defaultChecked
              value="business"
              {...register('type')}
              crossOrigin={undefined}
              icon={<CheckIcon height={12} width={12} />}
            />
            <Radio
              label="Residential"
              value="residential"
              {...register('type')}
              labelProps={{ className: 'text-sm' }}
              crossOrigin={undefined}
              icon={<CheckIcon height={12} width={12} />}
            />
          </div>
          <div className={`flex gap-3 ${typeWatcher !== 'residential' ? '' : 'hidden'}`}>
            <Button variant="outlined" className="w-1/2 bg-zembl-s1">
              Talk to an expert
            </Button>
            <Button variant="outlined" className="w-1/2 bg-zembl-s1">
              Compare online
            </Button>
          </div>
          <Button
            type="submit"
            onClick={() => navigate('/basic-info-1')}
            className="bg-zembl-action-primary text-zembl-p w-1/3 place-self-center"
          >
            Save
          </Button>
        </form>
      </PageWrapper>
    </GoogleReCaptchaProvider>
  )
}

interface IGoogleReCaptchaConsumerProps {
  executeRecaptcha?: (action?: string) => Promise<string>
  container?: string | HTMLElement
}

export default HomePage
