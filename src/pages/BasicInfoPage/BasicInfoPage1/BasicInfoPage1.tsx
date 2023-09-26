import { FieldValues, useForm } from 'react-hook-form'
import BasicBusinessDetailsForm from '../../../components/Forms/BasicInfos/BasicBusinessDetailsForm'
import EnergyTypeForm from '../../../components/Forms/BasicInfos/EnergyTypeForm'
import EnergySpendForm from '../../../components/Forms/BasicInfos/EnergySpendForm'
import PageNavigationActions from '../../../components/PageNavigationActions'
import { useRegistration } from '../../../hooks/useRegistration'
import { useEffect } from 'react'
import { Typography } from '@material-tailwind/react'
import { useToast } from '../../../hooks'
import {
  BOTH_VALUE,
  CAndI_VALUE,
  ELECTRICITY_VALUE,
  GAS_VALUE,
  MONTHLY_SPEND_MORE,
  QUARTERLY_SPEND_MORE,
  REGISTRATION_TYPE_BUSINESS,
  RESIDENTIAL_VALUE,
  SME_VALUE,
  YES_VALUE,
} from '../../../constants'
import { GoogleMapExtractedComponents } from '../../../helpers/googleMap'
import { getJSONDateString } from '../../../helpers/formatter'
import { useNavigate } from 'react-router-dom'

const BasicInfoPage1 = () => {
  const { fireAlert } = useToast()
  const navigate = useNavigate()
  // On load page get data from context
  const { updateLeadMutation, registrationData, setRegistrationData } = useRegistration()
  const { handleSubmit, control, watch, formState } = useForm({
    mode: 'all',
    defaultValues: registrationData as FieldValues,
  })

  const billFrequency: unknown = watch<string>('billFrequency', '')
  const isMoving: unknown = watch<string>('isMoving', false)

  const onSubmit = (data: FieldValues) => {
    const isBusiness = data?.registrationType === REGISTRATION_TYPE_BUSINESS
    const isCI =
      data.moreThanOne === YES_VALUE ||
      [MONTHLY_SPEND_MORE, QUARTERLY_SPEND_MORE].includes(data.billEnergySpend as string)

    let recordType = SME_VALUE
    if (!isBusiness) {
      recordType = RESIDENTIAL_VALUE
    } else if (isCI) {
      recordType = CAndI_VALUE
    }

    const buildedData = {
      ...data,
      electricity: [ELECTRICITY_VALUE, BOTH_VALUE].includes(data.energyType as string),
      gas: [GAS_VALUE, BOTH_VALUE].includes(data.energyType as string),
      recordType,
      id: data.leadId as string,
      moveInDate: getJSONDateString(data?.moveInDate as Date),
      newConnection: data.isMoving === YES_VALUE,
      fullAddress: (data.address as GoogleMapExtractedComponents).fullAddress,
    }
    console.log(buildedData)
    setRegistrationData((prev) => ({ ...prev, buildedData }))

    // updateLeadMutation.mutate(buildedData)
    navigate('/basic-info-2')
  }

  // ERROR HANDLING
  useEffect(() => {
    if (updateLeadMutation.isError && updateLeadMutation.error) {
      console.log(updateLeadMutation.error)
      fireAlert({ children: <Typography>Oops! Something has error!</Typography>, type: 'error' })
      return
    }
  }, [updateLeadMutation.isError, updateLeadMutation.error, fireAlert])

  // SUCCESS
  useEffect(() => {
    if (updateLeadMutation.isSuccess) {
      updateLeadMutation.reset()
    }
  }, [updateLeadMutation])

  const isNonBusiness = registrationData?.registrationType !== REGISTRATION_TYPE_BUSINESS

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full md:w-10/12">
      <BasicBusinessDetailsForm control={control} hideNonBusiness={isNonBusiness} />
      <EnergyTypeForm control={control} isMoving={isMoving as string} hideNonBusiness={isNonBusiness} />
      <EnergySpendForm control={control} billingType={billFrequency as string} />

      <PageNavigationActions prevLink="/" nextDisabled={!formState.isValid} />
    </form>
  )
}

export default BasicInfoPage1
