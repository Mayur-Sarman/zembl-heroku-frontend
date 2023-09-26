import { Typography } from '@material-tailwind/react'

import { Control, FieldValues, UseFormReturn, UseFormSetValue } from 'react-hook-form'
import { CURRENT_USAGE_OPTIONS, ELECTRICITY_VALUE, GAS_VALUE, RETAILER_OPTIONS } from '../../constants'
import ControllerRadioGroupInput from '../../components/Inputs/ControllerRadioGroupInput'
import { REQUIRED_VALIDATION, ABN_NMI_MIRN_VALIDATION } from '../../constants/validation'
import ControllerInput from '../../components/Inputs/ControllerInput'
import ControllerSelectInput from '../../components/Inputs/ControllerSelectInput'
import GoogleAddressInput from '../../components/Inputs/GoogleAddressInput'

const PaperBillForm = ({ control, energyType, setValue }: PaperBillFormProps) => {
  const gasForm =
    energyType !== ELECTRICITY_VALUE ? (
      <div className="flex flex-col gap-3">
        <Typography variant="h4" className="mb-2">
          Gas
        </Typography>
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <ControllerInput
            name="mirn"
            rules={ABN_NMI_MIRN_VALIDATION}
            required
            control={control}
            inputLabel="MIRN"
            textLabel="Enter your MIRN"
          />
          <ControllerSelectInput
            control={control}
            name="currentRetailerGas"
            textLabel="Current retailer"
            label="Retailer"
            placeholder="Select"
            options={RETAILER_OPTIONS}
            rules={REQUIRED_VALIDATION}
          />
        </div>
        <ControllerRadioGroupInput
            control={control}
            name="currentUsageGas"
            options={CURRENT_USAGE_OPTIONS}
            rules={REQUIRED_VALIDATION}
            label="What is current usage?"
          />
      </div>
    ) : null

  const electricityForm =
    energyType !== GAS_VALUE ? (
      <div className="flex flex-col gap-3">
        <Typography variant="h4" className="mb-2">
          Electricity
        </Typography>
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <ControllerInput
            name="nmi"
            rules={ABN_NMI_MIRN_VALIDATION}
            required
            control={control}
            inputLabel="NMI"
            textLabel="Enter your NMI"
          />
          <GoogleAddressInput
            control={control}
            required
            onSelectedCallback={(data) => {
              setValue('unitNumber', data?.unitNumber)
              setValue('unitType', data?.unitType)
              setValue('streetNumber', data?.street)
              setValue('streetName', data?.route)
              setValue('city', data?.suburb)
              setValue('postCode', data?.postCode)
              setValue('state', data?.state)
            }}
            textLabel="Your Connection Address"
            name="address"
            rules={REQUIRED_VALIDATION}
          />
          <ControllerSelectInput
            control={control}
            name="currentRetailerElectric"
            textLabel="Current retailer"
            label="Retailer"
            placeholder="Select"
            options={RETAILER_OPTIONS}
            rules={REQUIRED_VALIDATION}
          />
        </div>
        <ControllerRadioGroupInput
          control={control}
          name="currentUsageElectric"
          options={CURRENT_USAGE_OPTIONS}
          rules={REQUIRED_VALIDATION}
          label="What is current usage?"
        />
      </div>
    ) : null

  return (
    <>
      {electricityForm}
      {gasForm}
    </>
  )
}

interface PaperBillFormProps extends Partial<UseFormReturn> {
  control: Control
  energyType: string
  setValue: UseFormSetValue<FieldValues>
}

export default PaperBillForm
