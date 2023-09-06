import { Typography } from '@material-tailwind/react'

import InputWithLabel from '../../components/Inputs/InputWithLabel'
import SelectInput from '../../components/Inputs/SelectInput'
import RadioGroupInput from '../../components/Inputs/RadioGroupInput'
import { Controller, FieldValues, UseFormRegister, UseFormReturn, UseFormSetValue } from 'react-hook-form'
import { CURRENT_USAGE_OPTIONS, ELECTRICITY_VALUE, GAS_VALUE } from '../../constants'

const PaperBillForm = ({ register, setValue, control, energyType }: PaperBillFormProps) => {
  const gasForm =
    energyType !== ELECTRICITY_VALUE ? (
      <div className="flex flex-col gap-3">
        <Typography variant="h4" className="mb-2">
          Gas
        </Typography>
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <InputWithLabel inputLabel="MIRN" textLabel="Enter your MIRN" {...register('mirn')} />
          <SelectInput
            textLabel="Current retailer"
            label="Retailer"
            placeholder="Select"
            options={[{ value: 'test', label: 'test' }]}
            {...register('gasCurrentRetailer')}
            onChange={(e) => setValue('gasCurrentRetailer', e)}
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
          <InputWithLabel inputLabel="NMI" textLabel="Enter your NMI" {...register('nmi')} />
          <SelectInput
            textLabel="Current retailer"
            label="Retailer"
            placeholder="Select"
            options={[{ value: 'test', label: 'test' }]}
            {...register('electricityCurrentRetailer')}
            onChange={(e) => setValue('electricityCurrentRetailer', e)}
          />
        </div>
        <Controller
          control={control}
          name="currentUsage"
          render={({ field }) => (
            <RadioGroupInput
              {...field}
              label={
                <div>
                  <Typography variant="small">What is current usage?</Typography>
                </div>
              }
              values={[field.value]}
              options={CURRENT_USAGE_OPTIONS}
              buttonContainerClassName="w-full lg:w-1/3 py-1 lg:px-1 first:pl-0 last:pr-0"
              optionsContainerClassName="flex flex-wrap w-full"
            />
          )}
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
  setValue: UseFormSetValue<FieldValues>
  register: UseFormRegister<FieldValues>
  energyType: string
}

export default PaperBillForm
