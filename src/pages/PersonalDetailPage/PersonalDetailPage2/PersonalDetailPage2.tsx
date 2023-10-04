import { useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'
import PageNavigationActions from '../../../components/PageNavigationActions'
import AGLPersonalDetailsForm from '../../../components/Forms/RetailerAdditionalDetails/AGLPersonalDetailsForm'
import { useRegistration } from '../../../hooks/useRegistration'
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

const PersonalDetailPage2 = () => {
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
    hasPower,
    powerAware,
    hasWorkCompleted,
    electricalRenovationWork,
    accessMethod,
    firstName,
    lastName,
  ]: string[] = watch([
    'concession.concessionCardHolder',
    'concession.concessionConsent',
    'concession.onlyStateRebateResidence',
    'secondaryContact.hasSecondaryContact',
    'newConnection.powerConnected',
    'newConnection.powerAware',
    'newConnection.anyWorkCompletedSinceDisconnected',
    'newConnection.electricalRenovationWork',
    'newConnection.accessMethod',
    'secondaryContact.firstName',
    'secondaryContact.lastName',
  ]) as string[]

  const onSubmit = (data: Record<string, unknown>) => {
    console.log(data)

    // Call API
    // Put data to context
    // navigate('/plan-confirmation')

    retailerAdditionalDetailsMutation.mutate(buildRetailerAdditionalDetailPayload(data))
  }

  const contactName = `${firstName ?? ''} ${lastName ?? ''}`.trim()
  const selectedElecRetailer = registrationData?.electricityQuote?.retailerName ?? SIMPLY_ENERGY
  const selectedGasRetailer = registrationData?.gasQuote?.retailerName ?? SIMPLY_ENERGY

  registrationData.connectionDetails = { state: 'QLD' }
  registrationData.electricity = true
  registrationData.gas = true
  registrationData.registrationType = 'Residential'
  registrationData.currentRetailerElectric = BLUE_NRG
  registrationData.currentRetailerGas = BLUE_NRG
  registrationData.newConnection = true

  const isElectricTransfer = selectedElecRetailer !== registrationData?.currentRetailerElectric
  const isGasTransfer = selectedGasRetailer !== registrationData?.currentRetailerGas

  const electricPrice = registrationData?.electricityQuote?.connectionPrice ?? null
  const gasPrice = registrationData?.gasQuote?.connectionPrice ?? null

  useEffect(() => {
    if (!onlyResidence || onlyResidence === NO_VALUE) {
      setValue('concession.concessionConsent', NO_VALUE)
    }
  }, [setValue, onlyResidence])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
      {/* <SecondaryAccountHolderForm
        control={control}
        hasSecondaryAccountHolder={hasSecondaryAccountHolder === YES_VALUE}
      /> */}
      {[selectedElecRetailer, selectedGasRetailer].includes(AGL) ? (
        <AGLPersonalDetailsForm
          control={control}
          electric={!!registrationData?.electricity}
          gas={!!registrationData?.gas}
          connectionPrice={electricPrice} // NO GAS CONNECTION
          isNewConnection={!!registrationData?.newConnection}
          registrationType={registrationData?.registrationType ?? ''}
          state={registrationData?.connectionDetails?.state ?? ''}
          hasPower={hasPower}
          hasWorkCompleted={hasWorkCompleted}
          concessionHolder={concessionCardHolder}
          concessionConsent={concessionConsent}
          hasSecondaryContact={hasSecondaryContact}
          secondaryContactName={contactName}
          isTransfer={
            (selectedElecRetailer === AGL && isElectricTransfer) || (selectedGasRetailer === AGL && isGasTransfer)
          }
        />
      ) : null}

      {[selectedElecRetailer, selectedGasRetailer].includes(BLUE_NRG) ? (
        <BlueNRGPersonalDetailsForm
          control={control}
          electric={!!registrationData?.electricity}
          connectionPrice={electricPrice} // NO GAS CONNECTION
          isNewConnection={!!registrationData?.newConnection}
          state={registrationData?.connectionDetails?.state ?? ''}
          hasPower={hasPower}
          hasSecondaryContact={hasSecondaryContact}
          connectionDate={registrationData?.moveInDate ? new Date(registrationData?.moveInDate) : null}
        />
      ) : null}

      {[selectedElecRetailer, selectedGasRetailer].includes(ENERGY_AU) ? (
        <EAPersonalDetailsForm
          control={control}
          electricityConnectionPrice={electricPrice ?? null}
          gasConnectionPrice={gasPrice ?? null}
          isNewConnection={!!registrationData?.newConnection}
          state={registrationData?.connectionDetails?.state ?? ''}
          powerAware={powerAware}
          hasSecondaryContact={hasSecondaryContact}
          accessMethod={accessMethod}
        />
      ) : null}

      {[selectedElecRetailer, selectedGasRetailer].includes(SIMPLY_ENERGY) ? (
        <SEPersonalDetailsForm
          control={control}
          electric={!!registrationData?.electricity}
          registrationType={registrationData?.registrationType ?? ''}
          state={registrationData?.connectionDetails?.state ?? ''}
          onlyResidence={onlyResidence}
          siteAddress={
            (registrationData?.fullAddress as string) ??
            (registrationData?.address as GoogleMapExtractedComponents)?.fullAddress ??
            ''
          }
          isNewConnection={!!registrationData?.newConnection}
          powerAware={powerAware}
          electricityConnectionPrice={electricPrice ?? null}
          gasConnectionPrice={gasPrice ?? null}
          hasSecondaryContact={hasSecondaryContact}
          secondaryContactName={contactName}
          concessionCardHolder={concessionCardHolder}
          concessionConsent={concessionConsent}
        />
      ) : null}

      {[selectedElecRetailer, selectedGasRetailer].includes(MOMENTUM) ? (
        <MomentumPersonalDetailsForm
          control={control}
          registrationType={registrationData?.registrationType ?? ''}
          state={registrationData?.connectionDetails?.state ?? ''}
          isNewConnection={!!registrationData?.newConnection}
          powerAware={powerAware}
          electricityConnectionPrice={electricPrice ?? null}
          gasConnectionPrice={gasPrice ?? null}
          hasSecondaryContact={hasSecondaryContact}
          concessionCardHolder={concessionCardHolder}
          concessionConsent={concessionConsent}
          gas={registrationData.gas}
          electricity={registrationData.electricity}
        />
      ) : null}

      {[selectedElecRetailer, selectedGasRetailer].includes(ENERGY_LOCALS) ? (
        <EnergyLocalPersonalDetailsForm
          control={control}
          registrationType={registrationData?.registrationType ?? ''}
          isNewConnection={!!registrationData?.newConnection}
          electricalRenovationWork={electricalRenovationWork}
          hasSecondaryContact={hasSecondaryContact}
          concessionCardHolder={concessionCardHolder}
          concessionConsent={concessionConsent}
          connectionPrice={
            selectedElecRetailer === ENERGY_LOCALS
              ? electricPrice
              : selectedGasRetailer === ENERGY_LOCALS
              ? gasPrice
              : null
          }
        />
      ) : null}

      {[selectedElecRetailer, selectedGasRetailer].includes(NEXT_BUSINESS_ENERGY) ? (
        <NBEPersonalDetailsForm
          control={control}
          isNewConnection={!!registrationData?.newConnection}
          hasSecondaryContact={hasSecondaryContact}
          powerAware={powerAware}
          connectionPrice={
            selectedElecRetailer === NEXT_BUSINESS_ENERGY
              ? electricPrice
              : selectedGasRetailer === NEXT_BUSINESS_ENERGY
              ? gasPrice
              : null
          }
        />
      ) : null}
      <PageNavigationActions prevLink="/personal-detail-1" />
    </form>
  )
}

export default PersonalDetailPage2
