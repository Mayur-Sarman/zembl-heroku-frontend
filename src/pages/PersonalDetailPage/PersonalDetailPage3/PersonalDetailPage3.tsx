import { useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'
import PageNavigationActions from '../../../components/PageNavigationActions'
import AGLPersonalDetailsForm from '../../../components/Forms/RetailerAdditionalDetails/AGLPersonalDetailsForm'
import { useRegistration } from '../../../hooks/useRegistration'
import { REGISTRATION_TYPE_RESIDENTIAL } from '../../../constants'
import {
  AGL,
  BLUE_NRG,
  ENERGY_AU,
  ENERGY_LOCALS,
  MOMENTUM,
  NEXT_BUSINESS_ENERGY,
  NO_VALUE,
  SIMPLY_ENERGY,
} from '../../../constants'
import BlueNRGPersonalDetailsForm from '../../../components/Forms/RetailerAdditionalDetails/BlueNRGPersonalDetailsForm'
import EAPersonalDetailsForm from '../../../components/Forms/RetailerAdditionalDetails/EAPersonalDetailsForm'
import SEPersonalDetailsForm from '../../../components/Forms/RetailerAdditionalDetails/SEPersonalDetailsForm'
import { GoogleMapExtractedComponents } from '../../../helpers/googleMap'
import MomentumPersonalDetailsForm from '../../../components/Forms/RetailerAdditionalDetails/MomentumPersonalDetailsForm'
import EnergyLocalPersonalDetailsForm from '../../../components/Forms/RetailerAdditionalDetails/EnergyLocalPersonalDetailsForm'
import NBEPersonalDetailsForm from '../../../components/Forms/RetailerAdditionalDetails/NBEPersonalDetailsForm'
import { useRetailerAdditionalDetailsMutation } from '../../../hooks/useRetailerAdditionalDetailsMutation'
import { buildRetailerAdditionalDetailPayload } from '../../../api/profile'
import { useEffect } from 'react'

const PersonalDetailPage3 = () => {
  const { registrationData, registrationToken, setRegistrationData } = useRegistration()
  // On load page get data from context
  const { handleSubmit, control, watch, setValue } = useForm({ mode: 'all' })
  const navigate = useNavigate()

  const retailerAdditionalDetailsMutation = useRetailerAdditionalDetailsMutation(registrationToken ?? '', {
    onSuccess: (_, data) => {
      setRegistrationData((prev) => ({
        ...prev,
        secondaryContact: data.secondaryContact,
        newConnectionData: data.newConnection,
        concession: data.concession,
      }))
      navigate('/plan-confirmation')
    },
  })

  const [
    concessionCardHolder,
    concessionConsent,
    onlyResidence,
    hasSecondaryContact,
    gasConnected,
    powerAware,
    accessMethod,
    firstName,
    lastName,
  ]: string[] = watch([
    'concession.concessionCardHolder',
    'concession.concessionConsent',
    'concession.onlyStateRebateResidence',
    'secondaryContact.hasSecondaryContact',
    'gasNewConnection.gasConnected',
    'gasNewConnection.powerAware',
    'gasNewConnection.accessMethod',
    'secondaryContact.firstName',
    'secondaryContact.lastName',
  ]) as string[]

  const onSubmit = (data: Record<string, unknown>) => {
    const a = false;
    if(a)retailerAdditionalDetailsMutation.mutate(buildRetailerAdditionalDetailPayload(data))

    console.log('page - 3: ', data)
    setRegistrationData((prev) => ({
      ...prev,
      secondaryContact: data.secondaryContact,
      gasNewConnectionData: data.newConnection,
      concession: data.concession,
    }))

    console.log('registrationData - 3', registrationData)
  }
  console.log('log:', concessionCardHolder)
  console.log('registrationData', registrationData)
  const contactName = `${firstName ?? ''} ${lastName ?? ''}`.trim()
  const selectedGasRetailer = registrationData?.gasQuote?.retailerName ?? MOMENTUM
  const isGasTransfer = selectedGasRetailer !== registrationData?.currentRetailerGas
  const gasPrice = registrationData?.gasQuote?.connectionPrice ?? null
  registrationData.gas = true
  registrationData.registrationType = REGISTRATION_TYPE_RESIDENTIAL

  // setRegistrationData((prev) => ({
  //   ...prev,
  // registrationType: '',
  //   connectionDetails: {
  //     ...prev.connectionDetails,
  //     state: 'QLD'
  //   }
  // }))

  useEffect(() => {
    if (!onlyResidence || onlyResidence === NO_VALUE) {
      setValue('concession.concessionConsent', NO_VALUE)
    }
  }, [setValue, onlyResidence])

  useEffect(() => {
    setValue('secondaryContact', registrationData?.secondaryContact ?? {})
    setValue('concession', registrationData?.concession ?? {})
    setValue('newConnectionData', registrationData?.newConnectionData ?? {})
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
      {/* <SecondaryAccountHolderForm
        control={control}
        hasSecondaryAccountHolder={hasSecondaryAccountHolder === YES_VALUE}
      /> */}
      {[selectedGasRetailer].includes(AGL) ? (
        <AGLPersonalDetailsForm
          control={control}
          electric={false}
          gas={!!registrationData?.gas}
          // connectionPrice={electricPrice} // NO GAS CONNECTION
          isNewConnection={!!registrationData?.newConnection}
          registrationType={registrationData?.registrationType ?? ''}
          // state={registrationData?.connectionDetails?.state ?? ''}
          // hasPower={hasPower}
          // hasWorkCompleted={hasWorkCompleted}
          concessionHolder={concessionCardHolder}
          concessionConsent={concessionConsent}
          hasSecondaryContact={hasSecondaryContact}
          secondaryContactName={contactName}
          isTransfer={
            (selectedGasRetailer === AGL && isGasTransfer)
          }
        />
      ) : null}

      {[selectedGasRetailer].includes(BLUE_NRG) ? (
        <BlueNRGPersonalDetailsForm
          control={control}
          electric={false}
          isNewConnection={!!registrationData?.newConnection}
          hasSecondaryContact={hasSecondaryContact}
          connectionDate={registrationData?.moveInDate ? new Date(registrationData?.moveInDate) : null}
        />
      ) : null}

      {[selectedGasRetailer].includes(ENERGY_AU) ? (
        <EAPersonalDetailsForm
          control={control}
          electricityConnectionPrice={null}
          gasConnectionPrice={gasPrice ?? null}
          isNewConnection={!!registrationData?.newConnection}
          state={registrationData?.connectionDetails?.state ?? ''}
          powerAware={powerAware}
          hasSecondaryContact={hasSecondaryContact}
          accessMethod={accessMethod}
        />
      ) : null}

      {[selectedGasRetailer].includes(SIMPLY_ENERGY) ? (
        <SEPersonalDetailsForm
          control={control}
          electric={true}//!!registrationData?.electricity}
          registrationType={registrationData?.registrationType ?? ''}
          state={registrationData?.connectionDetails?.state ?? 'NSW'}
          onlyResidence={onlyResidence}
          siteAddress={
            (registrationData?.fullAddress as string) ??
            (registrationData?.address as GoogleMapExtractedComponents)?.fullAddress ??
            ''
          }
          isNewConnection={!!registrationData?.newConnection}
          powerAware={powerAware}
          electricityConnectionPrice={null}
          gasConnectionPrice={gasPrice ?? null}
          hasSecondaryContact={hasSecondaryContact}
          secondaryContactName={contactName}
          concessionCardHolder={concessionCardHolder}
          concessionConsent={concessionConsent}
        />
      ) : null}

      {[selectedGasRetailer].includes(MOMENTUM) ? (
        <MomentumPersonalDetailsForm
          control={control}
          registrationType={registrationData?.registrationType ?? ''}
          state={registrationData?.connectionDetails?.state ?? ''}
          isNewConnection={!!registrationData?.newConnection}
          powerAware={powerAware}
          gasConnected={gasConnected}
          electricityConnectionPrice={null}
          gasConnectionPrice={gasPrice ?? null}
          hasSecondaryContact={hasSecondaryContact}
          concessionCardHolder={concessionCardHolder}
          concessionConsent={concessionConsent}
          gas={!!registrationData.gas}
          electricity={!!registrationData.electricity}
        />
      ) : null}

      {[selectedGasRetailer].includes(ENERGY_LOCALS) ? (
        <EnergyLocalPersonalDetailsForm
          control={control}
          registrationType={registrationData?.registrationType ?? ''}
          isNewConnection={false}
          // electricalRenovationWork={electricalRenovationWork}
          hasSecondaryContact={hasSecondaryContact}
          concessionCardHolder={concessionCardHolder}
          concessionConsent={concessionConsent}
          connectionPrice={
            selectedGasRetailer === ENERGY_LOCALS
              ? gasPrice
              : null
          }
        />
      ) : null}

      {[selectedGasRetailer].includes(NEXT_BUSINESS_ENERGY) ? (
        <NBEPersonalDetailsForm
          control={control}
          isNewConnection={!!registrationData?.newConnection}
          hasSecondaryContact={hasSecondaryContact}
          powerAware={powerAware}
          connectionPrice={
            selectedGasRetailer === NEXT_BUSINESS_ENERGY
              ? gasPrice
              : null
          }
        />
      ) : null}

      <PageNavigationActions prevLink="/personal-detail-2" />
    </form>
  )
}

export default PersonalDetailPage3
