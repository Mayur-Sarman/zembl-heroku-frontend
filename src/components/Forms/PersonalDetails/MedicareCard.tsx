import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form'
import InputWithLabel from '../../Inputs/InputWithLabel'
import DateInput from '../../Inputs/DateInput'
import RadioGroupInput from '../../Inputs/RadioGroupInput'
import { MEDICARE_COLOUR_LIST_OPTIONS } from '../../../constants'

const MedicareCardForm = ({ control, register }: MedicareCardFormProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
      <InputWithLabel
        label="Medicare Card Number"
        textLabel="Medicare Card Number"
        {...register('medicareCard.cardNumber')}
      />
      <InputWithLabel
        label="Individual Reference Number"
        textLabel="Individual Reference Number"
        {...register('medicareCard.refNumber')}
      />
      <div className="flex flex-col gap-y-3 col-span-2">
        <Controller
          control={control}
          name="medicareCard.colour"
          render={({ field }) => {
            return (
              <RadioGroupInput
                label="Card Colour"
                {...field}
                values={[field.value]}
                options={MEDICARE_COLOUR_LIST_OPTIONS}
                optionsContainerClassName="grid grid-cols-4 gap-6"
                buttonContainerClassName="w-full"
              />
            )
          }}
        />
      </div>
      <InputWithLabel
        label="Middle Name"
        textLabel="Middle Name (if applicable)"
        {...register('medicareCard.middleName')}
      />
      <DateInput
        label="Expiry Date"
        name="medicareCard.expiryDate"
        control={control}
        datepickerClassNames={'top-auto'}
      />
    </div>
  )
}

interface MedicareCardFormProps {
  control: Control
  register: UseFormRegister<FieldValues>
}

export default MedicareCardForm
