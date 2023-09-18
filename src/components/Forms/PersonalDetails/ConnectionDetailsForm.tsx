import AccordionCard from '../../AccordionCard'
import { Typography } from '@material-tailwind/react'
import { STATE_LIST_OPTIONS } from '../../../constants'
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form'
import { MouseEventHandler, useCallback, useState } from 'react'
import ControllerInput from '../../Inputs/ControllerInput'
import ControllerSelectInput from '../../Inputs/ControllerSelectInput'
import { REQUIRED_VALIDATION } from '../../../constants/validation'
import GoogleAddressInput from '../../Inputs/GoogleAddressInput'

const ConnectionDetailsForm = ({ control, setValue }: ConnectionDetailsFormProps) => {
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
        <GoogleAddressInput
          control={control}
          required
          onSelectedCallback={(data) => {
            setValue('unitNumber', data?.unitNumber)
            setValue('unitType', data?.unitType)
            setValue('streetNumber', data?.street)
            setValue('streetName', data?.route)
            setValue('city', data?.suburb)
            setValue('postcode', data?.postalCode)
            setValue('state', data?.state)
          }}
          textLabel="Your Connection Address"
          name="address"
          rules={!isManualAddress ? { ...REQUIRED_VALIDATION } : {}}
          disabled={isManualAddress}
        />
        <Typography className="text-xs underline cursor-pointer" onClick={onToggleManualAddressClick}>
          {toggleAddressLabel}
        </Typography>
      </div>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6`}>
        <ControllerInput
          name="unitNumber"
          control={control}
          label="Unit Number"
          textLabel="Unit Number (optional)"
          disabled={!isManualAddress}
        />
        <ControllerInput
          name="unitType"
          control={control}
          label="Unit Type"
          textLabel="Unit Type (optional)"
          disabled={!isManualAddress}
        />
        <ControllerInput
          name="streetNumber"
          control={control}
          required={isManualAddress}
          label="Street Number"
          textLabel="Street Number"
          disabled={!isManualAddress}
        />
        <ControllerInput
          name="streetName"
          control={control}
          required={isManualAddress}
          label="Street Name"
          textLabel="Street Name"
          disabled={!isManualAddress}
        />
        <ControllerInput
          name="city"
          control={control}
          required={isManualAddress}
          label="Suburb/City"
          textLabel="Suburb or City"
          disabled={!isManualAddress}
        />
        <ControllerInput
          name="postcode"
          control={control}
          required={isManualAddress}
          label="Postcode"
          textLabel="Postcode"
          disabled={!isManualAddress}
        />
        <ControllerSelectInput
          name="state"
          control={control}
          textLabel="State"
          label="State"
          placeholder="Select..."
          options={STATE_LIST_OPTIONS}
          disabled={!isManualAddress}
          rules={isManualAddress ? REQUIRED_VALIDATION : {}}
        />
      </div>
    </AccordionCard>
  )
}

interface ConnectionDetailsFormProps {
  control: Control
  setValue: UseFormSetValue<FieldValues>
}

export default ConnectionDetailsForm
