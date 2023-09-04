import { useEffect } from 'react'

import { useModal, useToast } from '../../hooks'
import { useForm } from 'react-hook-form'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

import { Button, Input, Radio, Typography } from '@material-tailwind/react'
import { CheckIcon } from '@heroicons/react/20/solid'

import 'react-phone-input-2/lib/style.css'
import ZemblPhoneInput from '../../components/PhoneInput'

const HomePage = () => {
  const { fireAlert } = useToast()
  const { openModal } = useModal()
  const { register, handleSubmit, control } = useForm()
  const { executeRecaptcha }: IGoogleReCaptchaConsumerProps = useGoogleReCaptcha()

  const onSubmit = async (data) => {
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
    <div className="flex flex-col text-center bg-zembl-s h-full">
      <div className="flex flex-col items-center gap-6 py-6 px-4 max-w-screen-lg w-full m-auto">
        <Typography variant="h1" className="text-zembl-p text-3xl md:text-5xl">
          Zembl your energy
        </Typography>
        <Typography variant="small" className="text-zembl-p px-12 text-xs lg:text-base max-w-lg">
          Compare products from a range of retailers and sign up online to one that suits your needs.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 md:w-1/2">
          <Input
            className="bg-white"
            label="First Name"
            {...register('firstName', { required: true })}
            crossOrigin={''}
          />
          <Input
            className="bg-white"
            label="Last Name"
            {...register('lastName', { required: true })}
            crossOrigin={''}
          />
          <Input className="bg-white" label="Email" {...register('email', { required: true })} crossOrigin={''} />
          {/* <Input
            className="bg-white"
            label="Mobile Number"
            {...register('mobileNumber', { required: true })}
            crossOrigin={''}
          /> */}
          <ZemblPhoneInput control={control} label='Phone Number' name="phone" required defaultCountry={'au'} />
          {/* <PhoneInput country="au" {...register('mobileNumber')} /> */}
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
          <div className="flex gap-3">
            <Button variant="outlined" className="w-1/2 bg-zembl-s1">
              Talk to an expert
            </Button>
            <Button variant="outlined" className="w-1/2 bg-zembl-s1">
              Compare online
            </Button>
          </div>
          <Button type="submit" className="bg-zembl-action-primary text-zembl-p w-1/3 place-self-center">
            Save
          </Button>
        </form>
      </div>

      {/* <div>
        <img className='w-full' src={sponsorsImage} alt="Sponsors" />
      </div> */}
    </div>
  )
}

interface IGoogleReCaptchaConsumerProps {
  executeRecaptcha?: (action?: string) => Promise<string>
  container?: string | HTMLElement
}

export default HomePage
