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
  NEXT_BUSINESS_ENERGY,
  REGISTRATION_TYPE_BUSINESS,
} from '../../../constants'
import { useRegistration } from '../../../hooks/useRegistration'
import { buildMainProfilePayload } from '../../../api/profile'
import { useEffect } from 'react'

import DriverLicenseForm from '../../../components/Forms/PersonalDetails/DriverLicenseForm'
import AustralianPassportForm from '../../../components/Forms/PersonalDetails/AustralianPassportForm'
import MedicareCardForm from '../../../components/Forms/PersonalDetails/MedicareCard'
import ForeignPassportForm from '../../../components/Forms/PersonalDetails/ForeignPassport'
import AccountDetailsForm from '../../../components/Forms/PersonalDetails/AccountDetailsForm'
import BusinessDetailsForm from '../../../components/Forms/PersonalDetails/BusinessDetailsForm'
import ConnectionDetailsForm from '../../../components/Forms/PersonalDetails/ConnectionDetailsForm'
import PageNavigationActions from '../../../components/PageNavigationActions'
import ControllerRadioGroupInput from '../../../components/Inputs/ControllerRadioGroupInput'

const PersonalDetailPage1 = () => {
  const { registrationData, updateProfileMutation } = useRegistration()
  // On load page get data from context
  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: registrationData as FieldValues,
    mode: 'all',
  })

  const identificationTypeWatcher: unknown = watch<string>('identificationType', '')

  const onSubmit = (data: Record<string, string>) => {

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

  const selectedElecRetailer = electricQuote?.retailerName ?? null
  const selectedGasRetailer = gasQuote?.retailerName ?? null

  const electPlanCard =
    energyType !== GAS_VALUE ? (
      <MiniPlanCard
        brandIcon={electricQuote?.retailerLogo ?? ''}
        energyType={ELECTRICITY_VALUE}
        planName={electricQuote?.retailerName ?? ''}
      />
    ) : null

  const gasPlanCard =
    energyType !== ELECTRICITY_VALUE ? (
      <MiniPlanCard
        brandIcon={gasQuote?.retailerLogo ?? ''}
        energyType={GAS_VALUE}
        planName={gasQuote?.retailerName ?? ''}
      />
    ) : null

    const onlyContainsNumbers = (str:string) => /^\d+$/.test(str);

    useEffect(() => {
      if(!onlyContainsNumbers(watch('address.street') as string)) {
        const addressList = (watch('address.street') as string).split(' ')

        if(onlyContainsNumbers(addressList[0])) {
          setValue('address.street', addressList.splice(0,1))
        }

        setValue('address.route', addressList.join(' '))
      }
    },[])

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
        <BusinessDetailsForm control={control} readOnly={true}/>
      ) : null}
      <ConnectionDetailsForm control={control} setValue={setValue} />

      <AccordionCard alwaysOpen open title="Proof of Identity" bodyClassName="w-full flex flex-col gap-3 text-left">
        <div className="flex flex-col gap-y-3">
          <ControllerRadioGroupInput
            label="Identification Type"
            control={control}
            name="identificationType"
            options={IDENTITY_TYPE_OPTIONS.filter((item) =>
              selectedElecRetailer === NEXT_BUSINESS_ENERGY && selectedGasRetailer === NEXT_BUSINESS_ENERGY
                ? item.value !== MEDICARE_CARD_VALUE
                : true,
            )}
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
