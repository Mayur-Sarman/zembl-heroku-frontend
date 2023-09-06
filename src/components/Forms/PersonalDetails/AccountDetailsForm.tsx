import AccordionCard from '../../AccordionCard'
import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form'
import RadioGroupInput from '../../Inputs/RadioGroupInput'
import InputWithLabel from '../../Inputs/InputWithLabel'
import DateInput from '../../Inputs/DateInput'
import ZemblPhoneInput from '../../Inputs/PhoneInput'
import { TITLE_LIST_OPTIONS } from '../../../constants'

const AccountDetailsForm = ({ control, register }: AccountDetailsFormProps) => {
  return (
    <AccordionCard alwaysOpen open title="Account Details" bodyClassName="w-full flex flex-col gap-3 text-left">
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
              />
            )
          }}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
        <InputWithLabel label="First Name" textLabel="First Name (As per ID)" {...register('firstName')} />
        <InputWithLabel label="Last Name" textLabel="Last Name" {...register('lastName')} />
        <DateInput label="Date of Birth" control={control} name="dateOfBirth" datepickerClassNames={'top-auto'} />
        <InputWithLabel label="Email" textLabel="Email" type="email" {...register('email')} />
        <ZemblPhoneInput
          control={control}
          label="Mobile Number"
          name="mobileNumber"
          defaultCountry={'au'}
          dropdownClass="bottom-8 !rounded-lg"
        />
        <ZemblPhoneInput
          control={control}
          label="Alternate Mobile (optional)"
          name="aternativeMobile"
          defaultCountry={'au'}
          dropdownClass="bottom-8 !rounded-lg"
        />
      </div>
    </AccordionCard>
  )
}

interface AccountDetailsFormProps {
  control: Control
  register: UseFormRegister<FieldValues>
}

export default AccountDetailsForm
