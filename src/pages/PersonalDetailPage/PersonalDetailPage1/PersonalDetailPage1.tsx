import { Controller, useForm } from 'react-hook-form'
import { Button, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

import AccordionCard from '../../../components/AccordionCard'

import MiniPlanCard from '../../../components/MiniPlanCard'
import {
  AUSTRALIAN_PASSPORT_VALUE,
  DRIVER_LICENSE_VALUE,
  ELECTRICITY_VALUE,
  FOREIGN_PASSPORT_VALUE,
  GAS_VALUE,
  IDENTITY_TYPE_OPTIONS,
  MEDICARE_CARD_VALUE,
} from '../../../constants'
import RadioGroupInput from '../../../components/Inputs/RadioGroupInput'
import DriverLicenseForm from '../../../components/Forms/PersonalDetails/DriverLicenseForm'
import AustralianPassportForm from '../../../components/Forms/PersonalDetails/AustralianPassportForm'
import MedicareCardForm from '../../../components/Forms/PersonalDetails/MedicareCard'
import ForeignPassportForm from '../../../components/Forms/PersonalDetails/ForeignPassport'
import AccountDetailsForm from '../../../components/Forms/PersonalDetails/AccountDetailsForm'
import BusinessDetailsForm from '../../../components/Forms/PersonalDetails/BusinessDetailsForm'
import ConnectionDetailsForm from '../../../components/Forms/PersonalDetails/ConnectionDetailsForm'

const PersonalDetailPage1 = () => {
  // On load page get data from context
  const { register, handleSubmit, control, setValue, watch } = useForm()
  const navigate = useNavigate()

  const identificationTypeWatcher: unknown = watch<string>('identificationType', '')

  const onSubmit = (data: Record<string, string>) => {
    console.log(data)

    // Call API
    // Put data to context
  }

  const electricPlanBrandName = 'Big Boss Electricity'
  const gasPlanBrandName = 'Business Balance Plan 24'

  let identificationForm = null
  switch (identificationTypeWatcher) {
    case DRIVER_LICENSE_VALUE:
      identificationForm = <DriverLicenseForm register={register} control={control} setValue={setValue} />
      break
    case AUSTRALIAN_PASSPORT_VALUE:
      identificationForm = <AustralianPassportForm register={register} control={control} setValue={setValue} />
      break
    case MEDICARE_CARD_VALUE:
      identificationForm = <MedicareCardForm register={register} control={control} />
      break
    case FOREIGN_PASSPORT_VALUE:
      identificationForm = <ForeignPassportForm register={register} control={control} setValue={setValue} />
      break
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
      <AccordionCard
        alwaysOpen
        open
        title="Your Energy Plans"
        bodyClassName="w-full grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <MiniPlanCard brandIcon="/vite.svg" energyType={ELECTRICITY_VALUE} planName={electricPlanBrandName} />
        <MiniPlanCard brandIcon="/vite.svg" energyType={GAS_VALUE} planName={gasPlanBrandName} />
      </AccordionCard>

      <AccountDetailsForm control={control} register={register} />
      <BusinessDetailsForm register={register} />
      <ConnectionDetailsForm register={register} setValue={setValue} />

      <AccordionCard alwaysOpen open title="Proof of Identity" bodyClassName="w-full flex flex-col gap-3 text-left">
        <div className="flex flex-col gap-y-3">
          <Controller
            control={control}
            name="identificationType"
            render={({ field }) => {
              return (
                <RadioGroupInput
                  label="Identification Type"
                  {...field}
                  values={[field.value]}
                  options={IDENTITY_TYPE_OPTIONS}
                  optionsContainerClassName="grid grid-cols-1 lg:grid-cols-4 gap-6"
                  buttonContainerClassName="w-full"
                />
              )
            }}
          />
        </div>
        {identificationForm}
        <div className="bg-zembl-s1 p-4 rounded-md border">
          <Typography className="font-normal">
            I confirm that I am authorised to provide the personal details presented and I consent to my information
            being checked with the document issuer or official record holder via third party systems for the purpose of
            confirming my identity.
          </Typography>
        </div>
      </AccordionCard>

      <div className="flex flex-col lg:flex-row gap-6 justify-center">
        <Button
          variant="outlined"
          onClick={() => navigate('/plans')}
          className="text-zembl-p w-full lg:w-1/3 place-self-center"
        >
          Back
        </Button>
        <Button
          type="submit"
          onClick={() => navigate('/personal-detail-2')}
          className="!zembl-btn w-full lg:w-1/3 place-self-center"
        >
          Next
        </Button>
      </div>
    </form>
  )
}

export default PersonalDetailPage1
