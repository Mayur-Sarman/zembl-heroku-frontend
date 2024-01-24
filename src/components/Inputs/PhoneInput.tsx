import { Typography } from '@material-tailwind/react'
import { Control, Controller } from 'react-hook-form'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { REQUIRED_VALIDATION, PHONE_VALIDATION } from '../../constants/validation'
import ErrorTextMessage from '../ErrorTextMessage'

const ZemblPhoneInput = ({
  control,
  name,
  label,
  required,
  defaultCountry,
  dropdownClass,
  disabled,
  readOnly,
}: ZemblPhoneInputProps) => {
  const labelDisplay = label ? (
    <Typography
      variant="small"
      className={`mb-2 pl-1 ${required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''}`}
    >
      {label}
    </Typography>
  ) : null

  let rules = { ...PHONE_VALIDATION }
  if (required) rules = { ...rules, ...REQUIRED_VALIDATION }

  return (
    <div className="w-full">
      {labelDisplay}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { ref, ...field }, fieldState }) => {
          return (
            <div>
              <PhoneInput
                {...field}
                specialLabel={label}
                disabled={disabled}
                inputProps={{
                  ref: ref,
                  required: required,
                  disabled: disabled,
                  readOnly: readOnly,
                }}
                masks={{ au: '... ... ...' }}
                dropdownClass={`hidden text-zembl-p max-w-[200px] ${dropdownClass}`}
                containerClass="flex gap-8 w-full min-w-[200px]"
                buttonClass={`!rounded-md active:!border-gray-900 focus:!border-gray-900 pointer-events-none${
                  !!disabled || !!readOnly ? 'pointer-events-none' : ''
                }`}
                inputClass={`text-zembl-p ml-5 left-11 text-blue-gray-700 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm !px-3 py-2.5 !rounded-[7px] border-blue-gray-200 bg-white !h-10 !w-[calc(100%-44px)] focus:!border-gray-900 ${
                  disabled ? '!bg-blue-gray-50' : ''
                } ${fieldState.error ? '!border-red-500' : ''}`}
                country={defaultCountry}
                countryCodeEditable={false}
                onlyCountries={['au']}
                preferredCountries={['au']}
                preserveOrder={['preferredCountries']}
                disableDropdown={true}
              />
              {fieldState.error ? (
                <div className="mt-1 px-1 text-left">
                  <ErrorTextMessage>{fieldState.error.message ?? ''}</ErrorTextMessage>
                </div>
              ) : null}
            </div>
          )
        }}
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
  disabled?: boolean
  readOnly?: boolean
}

export default ZemblPhoneInput
