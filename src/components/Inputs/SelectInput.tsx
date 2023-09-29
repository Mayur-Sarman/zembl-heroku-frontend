import { ErrorMessage } from '@hookform/error-message'
import { Option, Select, SelectOptionProps, SelectProps, Typography } from '@material-tailwind/react'
import { ForwardedRef, ReactNode, forwardRef } from 'react'
import ErrorTextMessage from '../ErrorTextMessage'
import { FieldError, FieldErrors, FieldValues } from 'react-hook-form'

const SelectInput = forwardRef(function SelectInput(
  { name, options, textLabel, onChange, errors, fieldError, required, readOnly, ...rest }: SelectInputProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const optionDisplay = options.map((opt) => (
    <Option key={opt.value} value={opt.value}>
      {opt.label}
    </Option>
  ))

  const hasError = !!errors?.[name ?? ''] || !!fieldError

  return (
    <div className="w-full">
      <Typography
        variant="small"
        className={`mb-2 pl-1 md:text-base ${required ? `after:content-['*'] after:text-red-500 after:ml-1` : ''}`}
      >
        {textLabel}
      </Typography>
      <Select
        {...rest}
        ref={ref}
        onChange={onChange}
        placeholder="Select..."
        className={`!border !border-blue-gray-200 focus:!border-gray-900 ${hasError ? '!border-red-500' : ''} ${
          readOnly ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
        labelProps={{ className: 'hidden' }}
      >
        {optionDisplay}
      </Select>
      {errors?.[name ?? ''] ? (
        <div className="mt-1 px-1">
          <ErrorMessage
            name={name ?? ''}
            errors={errors ?? {}}
            render={({ message }) => <ErrorTextMessage>{message}</ErrorTextMessage>}
          />
        </div>
      ) : null}
      {fieldError ? (
        <div className="mt-1 px-1">
          <ErrorTextMessage>{fieldError.message}</ErrorTextMessage>
        </div>
      ) : null}
    </div>
  )
})

export interface SelectInputProps extends Partial<SelectProps> {
  options: SelectOption[]
  textLabel: string
  errors?: FieldErrors<FieldValues>
  fieldError?: FieldError
  required?: boolean
  readOnly?: boolean
}

interface SelectOption extends Partial<SelectOptionProps> {
  value: string | undefined
  label: ReactNode
}

export default SelectInput
