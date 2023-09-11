import AccordionCard from '../../AccordionCard'
import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form'
import RadioGroupInput from '../../Inputs/RadioGroupInput'
import InputWithLabel from '../../Inputs/InputWithLabel'
import DateInput from '../../Inputs/DateInput'
import ZemblPhoneInput from '../../Inputs/PhoneInput'
import { TITLE_LIST_OPTIONS } from '../../../constants'
import { MouseEventHandler, useCallback, useState } from 'react'
import EditActionButton from '../../Buttons/EditActionButton'
import { Typography } from '@material-tailwind/react'

const AccountDetailsForm = ({ control, register, readOnly }: AccountDetailsFormProps) => {
  const [isEditing, setIsEditing] = useState(!readOnly)

  const onEditClickHandler: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsEditing((prev) => !prev)
  }, [])

  const editButton = readOnly ? (
    <EditActionButton isEditing={isEditing} onEditClickHandler={onEditClickHandler} />
  ) : null

  const titleDisplay = (
    <div className="flex items-center w-full justify-between">
      <Typography variant="h6">{'Account Details'}</Typography>
      {editButton}
    </div>
  )

  const isFieldsReadOnly = readOnly && !isEditing

  return (
    <AccordionCard alwaysOpen open title={titleDisplay} bodyClassName="w-full flex flex-col gap-3 text-left">
      <div className="flex flex-col gap-y-3">
        <Controller
          control={control}
          name="title"
          render={({ field }) => {
            return (
              <RadioGroupInput
                label="Your title"
                {...field}
                values={[field.value]}
                options={TITLE_LIST_OPTIONS}
                optionsContainerClassName="grid grid-cols-3 gap-2 md:flex lg:w-2/3"
                readOnly={isFieldsReadOnly}
              />
            )
          }}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
        <InputWithLabel
          label="First Name"
          textLabel="First Name (As per ID)"
          {...register('firstName')}
          readOnly={isFieldsReadOnly}
        />
        <InputWithLabel label="Last Name" textLabel="Last Name" {...register('lastName')} readOnly={isFieldsReadOnly} />
        <DateInput
          label="Date of Birth"
          control={control}
          name="dateOfBirth"
          datepickerClassNames={'top-auto'}
          readOnly={isFieldsReadOnly}
        />
        <InputWithLabel
          label="Email"
          textLabel="Email"
          type="email"
          {...register('email')}
          readOnly={isFieldsReadOnly}
        />
        <ZemblPhoneInput
          control={control}
          label="Mobile Number"
          name="mobileNumber"
          defaultCountry={'au'}
          dropdownClass="bottom-8 !rounded-lg"
          readOnly={isFieldsReadOnly}
        />
        <ZemblPhoneInput
          control={control}
          label="Alternate Mobile (optional)"
          name="aternativeMobile"
          defaultCountry={'au'}
          dropdownClass="bottom-8 !rounded-lg"
          readOnly={isFieldsReadOnly}
        />
      </div>
    </AccordionCard>
  )
}

interface AccountDetailsFormProps {
  control: Control
  register: UseFormRegister<FieldValues>
  readOnly?: boolean
}

export default AccountDetailsForm
