import { Typography } from '@material-tailwind/react'

import { Control, UseFormReturn } from 'react-hook-form'
import { CURRENT_USAGE_OPTIONS, ELECTRICITY_VALUE, GAS_VALUE } from '../../constants'
import ControllerRadioGroupInput from '../../components/Inputs/ControllerRadioGroupInput'
import { REQUIRED_VALIDATION, ABN_NMI_MIRN_VALIDATION } from '../../constants/validation'
import ControllerInput from '../../components/Inputs/ControllerInput'
import ControllerSelectInput from '../../components/Inputs/ControllerSelectInput'

const PaperBillForm = ({ control, energyType }: PaperBillFormProps) => {
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
            name="gasCurrentRetailer"
            textLabel="Current retailer"
            label="Retailer"
            placeholder="Select"
            options={[{ value: 'test', label: 'test' }]}
            rules={REQUIRED_VALIDATION}
          />
          <ControllerRadioGroupInput
            control={control}
            name="gasCurrentUsage"
            options={CURRENT_USAGE_OPTIONS}
            rules={REQUIRED_VALIDATION}
            label="What is current usage?"
          />
        </div>
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
          <ControllerSelectInput
            control={control}
            name="electricityCurrentRetailer"
            textLabel="Current retailer"
            label="Retailer"
            placeholder="Select"
            options={[{ value: 'test', label: 'test' }]}
            rules={REQUIRED_VALIDATION}
          />
        </div>
        <ControllerRadioGroupInput
          control={control}
          name="electricityCurrentUsage"
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
}

export default PaperBillForm
