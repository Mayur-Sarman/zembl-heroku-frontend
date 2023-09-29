import { FieldValues, useForm } from 'react-hook-form'
import { Typography } from '@material-tailwind/react'

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
  REGISTRATION_TYPE_BUSINESS,
} from '../../../constants'
import DriverLicenseForm from '../../../components/Forms/PersonalDetails/DriverLicenseForm'
import AustralianPassportForm from '../../../components/Forms/PersonalDetails/AustralianPassportForm'
import MedicareCardForm from '../../../components/Forms/PersonalDetails/MedicareCard'
import ForeignPassportForm from '../../../components/Forms/PersonalDetails/ForeignPassport'
import AccountDetailsForm from '../../../components/Forms/PersonalDetails/AccountDetailsForm'
import BusinessDetailsForm from '../../../components/Forms/PersonalDetails/BusinessDetailsForm'
import ConnectionDetailsForm from '../../../components/Forms/PersonalDetails/ConnectionDetailsForm'
import PageNavigationActions from '../../../components/PageNavigationActions'
import ControllerRadioGroupInput from '../../../components/Inputs/ControllerRadioGroupInput'
import { useRegistration } from '../../../hooks/useRegistration'
import { buildMainProfilePayload } from '../../../api/profile'
import { useNavigate } from 'react-router-dom'
// import { GoogleMapExtractedComponents } from '../../../helpers/googleMap'

const PersonalDetailPage1 = () => {
  const navigate = useNavigate()
  const { registrationData, updateProfileMutation } = useRegistration()
  // On load page get data from context
  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: registrationData as FieldValues,
    mode: 'all',
  })

  const identificationTypeWatcher: unknown = watch<string>('identificationType', '')

  const onSubmit = async (data: Record<string, string>) => {
    console.log(data)
    const a = await new Promise(resolve => resolve(1))
    if (a === 1) {
      return navigate('/personal-detail-2')
    }

    // Call API
    // Put data to context
    updateProfileMutation.mutate(buildMainProfilePayload({ ...registrationData, ...data }))
  }

  let identificationForm = null
  switch (identificationTypeWatcher) {
    case DRIVER_LICENSE_VALUE:
      identificationForm = <DriverLicenseForm control={control} />
      break
    case AUSTRALIAN_PASSPORT_VALUE:
      identificationForm = <AustralianPassportForm control={control} />
      break
    case MEDICARE_CARD_VALUE:
      identificationForm = <MedicareCardForm control={control} />
      break
    case FOREIGN_PASSPORT_VALUE:
      identificationForm = <ForeignPassportForm control={control} />
      break
  }

  const electricQuote = registrationData?.electricityQuote
  const gasQuote = registrationData?.gasQuote
  const energyType = registrationData?.energyType

  const electPlanCard =
    energyType !== GAS_VALUE ? (
      <MiniPlanCard
        brandIcon={electricQuote?.retailerIconLink ?? ''}
        energyType={ELECTRICITY_VALUE}
        planName={electricQuote?.retailerName ?? ''}
      />
    ) : null

  const gasPlanCard =
    energyType !== ELECTRICITY_VALUE ? (
      <MiniPlanCard
        brandIcon={gasQuote?.retailerIconLink ?? ''}
        energyType={ELECTRICITY_VALUE}
        planName={gasQuote?.retailerName ?? ''}
      />
    ) : null

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
      <AccordionCard
        alwaysOpen
        open
        title="Your Energy Plans"
        bodyClassName="w-full grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {electPlanCard}
        {gasPlanCard}
      </AccordionCard>

      <AccountDetailsForm control={control} />
      {registrationData?.registrationType === REGISTRATION_TYPE_BUSINESS ? (
        <BusinessDetailsForm control={control} />
      ) : null}
      <ConnectionDetailsForm control={control} setValue={setValue} />

      <AccordionCard alwaysOpen open title="Proof of Identity" bodyClassName="w-full flex flex-col gap-3 text-left">
        <div className="flex flex-col gap-y-3">
          <ControllerRadioGroupInput
            label="Identification Type"
            control={control}
            name="identificationType"
            options={IDENTITY_TYPE_OPTIONS}
            required
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

      <PageNavigationActions prevLink="/plans" />
    </form>
  )
}

export default PersonalDetailPage1
