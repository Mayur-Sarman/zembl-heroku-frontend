import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { ErrorMessage } from '@hookform/error-message'
import { Input, InputProps, Typography } from '@material-tailwind/react'
import { ForwardedRef, ReactNode, forwardRef } from 'react'
import { FieldError, FieldErrors, FieldValues } from 'react-hook-form'
import ErrorTextMessage from '../ErrorTextMessage'

const InputWithLabel = forwardRef(function InputWithLabel(
  {
    name,
    onChange,
    inputLabel,
    textLabel,
    className,
    containerClassName,
    errors,
    fieldError,
    required,
    ...rest
  }: InputWithLabelProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const textLabelDisplay = textLabel ? (
    <Typography
      variant="small"
      className={`mb-2 pl-1 ${required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''}`}
    >
      {textLabel}
    </Typography>
  ) : null

  const hasError = !!errors?.[name] || !!fieldError

  return (
    <div className={`text-left w-full ${containerClassName}`}>
      {textLabelDisplay}
      <Input
        label={inputLabel}
        name={name}
        onChange={onChange}
        {...rest}
        ref={ref}
        crossOrigin=""
        placeholder={inputLabel ?? rest.label}
        className={`!border bg-white focus:!border-gray-900 border-t-blue-gray-200 ${className} ${
          hasError ? '!border-red-500' : '!border-t-blue-gray-200'
        }`}
        labelProps={{ className: 'hidden' }}
        error={hasError}
        icon={hasError ? <ExclamationCircleIcon color="red" className="h-5 w-5" /> : rest.icon}
      />
      {errors?.[name] ? (
        <div className="mt-1 px-1">
          <ErrorMessage
            name={name}
            errors={errors ?? {}}
            render={({ message }) => <ErrorTextMessage>{message}</ErrorTextMessage>}
          />
        </div>
      ) : null}
      {fieldError ? (
        <div className="mt-1 px-1 text-left">
          <ErrorTextMessage>{fieldError.message ?? ''}</ErrorTextMessage>
        </div>
      ) : null}
    </div>
  )
})

export interface InputWithLabelProps extends InputProps {
  name: string
  errors?: FieldErrors<FieldValues>
  inputLabel?: string
  textLabel?: ReactNode
  containerClassName?: string
  fieldError?: FieldError
  required?: boolean
}

export default InputWithLabel
