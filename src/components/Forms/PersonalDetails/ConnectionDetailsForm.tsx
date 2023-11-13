import AccordionCard from '../../AccordionCard'
import { Typography } from '@material-tailwind/react'
import { STATE_LIST_OPTIONS } from '../../../constants'
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form'
import {  useState } from 'react'
import ControllerInput from '../../Inputs/ControllerInput'
import ControllerSelectInput from '../../Inputs/ControllerSelectInput'
import { REQUIRED_VALIDATION } from '../../../constants/validation'
// import GoogleAddressInput from '../../Inputs/GoogleAddressInput'

const ConnectionDetailsForm = ({ control }: ConnectionDetailsFormProps) => {
  const [isManualAddress] = useState<boolean>(false)

  // const onToggleManualAddressClick = useCallback<MouseEventHandler>(() => {
  //   setIsManualAddress((prev) => !prev)
  // }, [])

  // const toggleAddressLabel = isManualAddress
  //   ? 'Find you address automatically'
  //   : 'Can’t find your address? Enter manually'

  return (
    <AccordionCard alwaysOpen open title="Connection Details" bodyClassName="w-full flex flex-col gap-3 text-left">
      <div className={`flex flex-col gap-y-6`}>
        {/* <GoogleAddressInput
          control={control}
          required
          onSelectedCallback={(data) => {
            setValue('address.unitNumber', data?.unitNumber)
            setValue('address.unitType', data?.unitType)
            setValue('address.streetNumber', data?.street)
            setValue('address.streetName', data?.route)
            setValue('address.city', data?.suburb)
            setValue('address.postCode', data?.postCode)
            setValue('address.state', data?.state)
          }}
          textLabel="Your Connection Address"
          name="address"
          rules={!isManualAddress ? { ...REQUIRED_VALIDATION } : {}}
          disabled={isManualAddress}
        /> */}
        <Typography className="" >
          Your Connection Address
        </Typography>
      </div>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6`}>
        <ControllerInput
          name="address.unitNumber"
          control={control}
          label="Unit Number"
          textLabel="Unit Number (optional)"
          disabled={!isManualAddress}
        />
        <ControllerInput
          name="address.unitType"
          control={control}
          label="Unit Type"
          textLabel="Unit Type (optional)"
          disabled={!isManualAddress}
        />
        <ControllerInput
          name="address.street"
          control={control}
          required={isManualAddress}
          label="Street Number"
          textLabel="Street Number"
          disabled={!isManualAddress}
        />
        <ControllerInput
          name="address.route"
          control={control}
          required={isManualAddress}
          label="Street Name"
          textLabel="Street Name"
          disabled={!isManualAddress}
        />
        <ControllerInput
          name="address.city"
          control={control}
          required={isManualAddress}
          label="Suburb/City"
          textLabel="Suburb or City"
          disabled={!isManualAddress}
        />
        <ControllerInput
          name="address.postCode"
          control={control}
          required={isManualAddress}
          label="Postcode"
          textLabel="Postcode"
          disabled={!isManualAddress}
        />
        <ControllerSelectInput
          name="address.state"
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
