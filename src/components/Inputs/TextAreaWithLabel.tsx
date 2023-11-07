import { ErrorMessage } from '@hookform/error-message'
import { Textarea, TextareaProps, Typography } from '@material-tailwind/react'
import ErrorTextMessage from '../ErrorTextMessage'
import { ForwardedRef, ReactNode, forwardRef } from 'react'
import { FieldError, FieldErrors, FieldValues } from 'react-hook-form'

const TextAreaWithLabel = forwardRef(function TextAreaWithLabel(
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
  }: TextAreaWithLabel,
  ref: ForwardedRef<HTMLDivElement>,
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
      <Textarea
        label={inputLabel}
        name={name}
        placeholder={inputLabel ?? rest.label}
        onChange={onChange}
        {...rest}
        ref={ref}
        className={`!border bg-white focus:!border-gray-900 border-t-blue-gray-200 ${className} ${
          hasError ? '!border-red-500' : '!border-t-blue-gray-200'
        }`}
        labelProps={{ className: 'hidden' }}
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

export interface TextAreaWithLabel extends TextareaProps {
  name: string
  errors?: FieldErrors<FieldValues>
  inputLabel?: string
  textLabel?: ReactNode
  containerClassName?: string
  fieldError?: FieldError
  required?: boolean
}

export default TextAreaWithLabel
