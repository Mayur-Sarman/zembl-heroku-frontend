import { Typography } from '@material-tailwind/react'
import { Control, Controller } from 'react-hook-form'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const ZemblPhoneInput = ({ control, name, label, required, defaultCountry, dropdownClass }: ZemblPhoneInputProps) => {
  const labelDisplay = label ? (
    <Typography variant="small" className="mb-2 pl-1">
      {label}
    </Typography>
  ) : null

  return (
    <div className="w-full">
      {labelDisplay}
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={({ field: { ref, ...field } }) => (
          <PhoneInput
            {...field}
            specialLabel={label}
            inputProps={{
              ref,
              required: true,
            }}
            dropdownClass={`text-zembl-p max-w-[200px] ${dropdownClass}`}
            containerClass="flex gap-8 w-full min-w-[200px]"
            buttonClass="!rounded-md active:!border-gray-900 focus:!border-gray-900"
            inputClass="text-zembl-p ml-5 left-11 text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm !px-3 py-2.5 !rounded-[7px] border-blue-gray-200 bg-white !h-10 !w-[calc(100%-44px)] focus:!border-gray-900"
            country={defaultCountry}
            countryCodeEditable={false}
            preferredCountries={['au']}
            preserveOrder={['preferredCountries']}
          />
        )}
      />
    </div>
  )
}

export interface ZemblPhoneInputProps {
  control: Control
  name: string
  label?: string
  required?: boolean
  defaultCountry?: string
  dropdownClass?: string
}

export default ZemblPhoneInput
