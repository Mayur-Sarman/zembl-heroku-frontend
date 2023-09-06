import InputWithLabel from '../../Inputs/InputWithLabel'
import AccordionCard from '../../AccordionCard'
import { Typography } from '@material-tailwind/react'
import SelectInput from '../../Inputs/SelectInput'
import { STATE_LIST_OPTIONS } from '../../../constants'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { MouseEventHandler, useCallback, useState } from 'react'

const ConnectionDetailsForm = ({ register, setValue }: ConnectionDetailsFormProps) => {
  const [isManualAddress, setIsManualAddress] = useState<boolean>(false)

  const onToggleManualAddressClick = useCallback<MouseEventHandler>(() => {
    setIsManualAddress((prev) => !prev)
  }, [])

  const toggleAddressLabel = isManualAddress
    ? 'Find you address automatically'
    : 'Can’t find your address? Enter manually'

  return (
    <AccordionCard alwaysOpen open title="Connection Details" bodyClassName="w-full flex flex-col gap-3 text-left">
      <div className={`flex flex-col gap-y-6`}>
        <InputWithLabel
          label="Enter and select your address"
          textLabel="Your Connection Address"
          disabled={isManualAddress}
          {...register('address')}
        />
        <Typography className="text-xs underline cursor-pointer" onClick={onToggleManualAddressClick}>
          {toggleAddressLabel}
        </Typography>
      </div>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6`}>
        <InputWithLabel
          label="Unit Number"
          textLabel="Unit Number (optional)"
          {...register('unitNumber')}
          disabled={!isManualAddress}
        />
        <InputWithLabel
          label="Unit Type"
          textLabel="Unit Type (optional)"
          {...register('unitType')}
          disabled={!isManualAddress}
        />
        <InputWithLabel
          label="Street Number"
          textLabel="Street Number"
          {...register('streetNumber')}
          disabled={!isManualAddress}
        />
        <InputWithLabel
          label="Street Name"
          textLabel="Street Name"
          {...register('streetName')}
          disabled={!isManualAddress}
        />
        <InputWithLabel
          label="Suburb/City"
          textLabel="Suburb or City"
          {...register('city')}
          disabled={!isManualAddress}
        />
        <InputWithLabel label="Postcode" textLabel="Postcode" {...register('postcode')} disabled={!isManualAddress} />
        <SelectInput
          textLabel="State"
          label="State"
          placeholder="Select..."
          options={STATE_LIST_OPTIONS}
          disabled={!isManualAddress}
          {...register('state')}
          onChange={(e) => setValue('state', e)}
        />
      </div>
    </AccordionCard>
  )
}

interface ConnectionDetailsFormProps {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export default ConnectionDetailsForm
