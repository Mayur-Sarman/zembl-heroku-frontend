import { Control, Controller, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import RadioGroupInput from '../../Inputs/RadioGroupInput'
import InputWithLabel from '../../Inputs/InputWithLabel'
import DateInput from '../../Inputs/DateInput'
import ZemblPhoneInput from '../../Inputs/PhoneInput'
import { Typography } from '@material-tailwind/react'
import SelectInput from '../../Inputs/SelectInput'
import AccordionCard from '../../AccordionCard'
import { TITLE_LIST_OPTIONS, YES_NO_OPTIONS } from '../../../constants'

const SecondaryAccountHolderForm = ({ control, register, setValue }: SecondaryAccountHolderFormProps) => {
  return (
    <AccordionCard
      alwaysOpen
      open
      title="Secondary Account Holder"
      bodyClassName="w-full flex flex-col gap-3 text-left"
    >
      <div className="flex flex-col gap-y-3">
        <Controller
          control={control}
          name="hasSecondaryAccountHolder"
          render={({ field }) => {
            return (
              <RadioGroupInput
                label="Want to add another authorised person?"
                {...field}
                values={[field.value]}
                options={YES_NO_OPTIONS}
                optionsContainerClassName="grid grid-cols-1 lg:grid-cols-3 gap-6"
                buttonContainerClassName="w-full"
              />
            )
          }}
        />
      </div>

      <div className="bg-zembl-s1 p-4 rounded-md border">
        <Typography className="font-normal">
          The nominated person has been added as an authorised contact person. They will be able to maintain your
          account, including disconnecting the supply. However, they will not be able to accept any product offers,
          connect you at a new property or establish a concession rebate. Please be aware that their name will not be
          displayed on the bill, and they will remain on the account until removed or it is no longer active.
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
        <div className="w-full lg:col-span-2 lg:w-1/2">
          <SelectInput
            label="Title"
            textLabel="Title"
            placeholder="Select..."
            options={TITLE_LIST_OPTIONS}
            {...register('secondaryHolder.title')}
            onChange={(e) => setValue('secondaryHolder.title', e)}
          />
        </div>
        <InputWithLabel
          label="First Name"
          textLabel="First Name (As per ID)"
          {...register('secondaryHolder.firstName')}
        />
        <InputWithLabel label="Last Name" textLabel="Last Name" {...register('secondaryHolder.lastName')} />
        <InputWithLabel label="Email" textLabel="Email" type="email" {...register('secondaryHolder.email')} />
        <ZemblPhoneInput
          control={control}
          label="Mobile Number"
          name="secondaryHolder.mobileNumber"
          defaultCountry={'au'}
          dropdownClass="bottom-8 !rounded-lg"
        />
        <DateInput label="Date of Birth" control={control} name="dateOfBirth" datepickerClassNames={'top-auto'} />
      </div>
    </AccordionCard>
  )
}

interface SecondaryAccountHolderFormProps {
  control: Control
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export default SecondaryAccountHolderForm
