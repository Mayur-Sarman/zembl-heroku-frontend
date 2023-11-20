import { Typography } from '@material-tailwind/react'

import { Control, FieldValues, UseFormReturn, UseFormSetValue, useForm } from 'react-hook-form'
import { 
  CURRENT_USAGE_OPTIONS, 
  ELECTRICITY_VALUE, 
  GAS_VALUE, 
  RETAILER_OPTIONS, 
} from '../../constants'
import { REQUIRED_VALIDATION, ABN_NMI_MIRN_VALIDATION } from '../../constants/validation'
import { lazy } from 'react'

const ControllerRadioGroupPaperbillInput = lazy(() => import('../../components/Inputs/ControllerRadioGroupPaperbillInput'))
const ControllerInput = lazy(() => import('../../components/Inputs/ControllerInput'))
const ControllerSelectInput = lazy(() => import('../../components/Inputs/ControllerSelectInput'))
const GoogleAddressInput = lazy(() => import('../../components/Inputs/GoogleAddressInput'))

const PaperBillForm = ({ control, energyType }: PaperBillFormProps) => {
  const { setValue } = useForm({})

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
            tooltipText="You can locate your MIRN or Meter Installation Registration Number (sometimes referred to as the ‘DPI’) on your gas bill, usually under the gas usage section."
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
        <ControllerRadioGroupPaperbillInput
            control={control}
            name="currentUsageGas"
            options={CURRENT_USAGE_OPTIONS}
            rules={REQUIRED_VALIDATION}
            label="What is current usage?"
            isCurrentUsage={true}
          currentUsageType={GAS_VALUE}
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
            tooltipText="Your NMI, or National Meter Identifier, is a unique number for your home or business. You'll find the NMI on the electricity bill. The NMI may be on the front of the first or second page and can include numbers and letters and is 10 or 11 characters long"
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
        <ControllerRadioGroupPaperbillInput
          control={control}
          name="currentUsageElectric"
          options={CURRENT_USAGE_OPTIONS}
          rules={REQUIRED_VALIDATION}
          label="What is current usage?"
          isCurrentUsage={true}
          currentUsageType={ELECTRICITY_VALUE}
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
