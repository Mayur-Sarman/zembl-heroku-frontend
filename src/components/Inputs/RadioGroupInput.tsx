// import { Typography } from '@material-tailwind/react'
import StatefulButton from './StatefulButton'
import { FormEventHandler, ForwardedRef, ReactNode, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import ErrorTextMessage from '../ErrorTextMessage'
// import ControllerTooltip from '../Icons/ControllerTooltip'

const RadioGroupInput = forwardRef(function RadioGroupInput(
  {
    name,
    // label,
    disabled,
    values,
    onChange,
    buttonContainerClassName,
    optionsContainerClassName,
    options,
    readOnly,
    error,
    // required,
    // labelClassName,
    // tooltipText,
    // isCurrentUsage, 
    // currentUsageType
  }: RadioGroupInputProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const hasError = !!error
  // const labelDisplay =
  //   label && (typeof label === 'string') ? (
  //     (isCurrentUsage ?? !!tooltipText) ? <>
  //       <Typography
  //       className={`mb-2 pl-1 font-light text-sm inline-block ${
  //         required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''
  //       } ${labelClassName ?? ''}`}
  //       >
  //         {label}
  //       </Typography>
  //       <ControllerTooltip tooltipText={tooltipText} isCurrentUsage={isCurrentUsage} currentUsageType={currentUsageType}/>
  //     </> :
  //     <Typography
  //       className={`mb-2 pl-1 font-light text-sm ${
  //         required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''
  //       } ${labelClassName ?? ''}`}
  //     >
  //       {label}
  //     </Typography>
  //   ) : label

  const optionsDisplay: ReactNode[] = options.map((option) => {
    const className =
      buttonContainerClassName ??
      `w-full lg:w-1/3 ${buttonContainerClassName ?? ''} ${readOnly ? 'pointer-events-none' : ''}`
    return (
      <div key={option.value} className={className}>
        <StatefulButton
          className="min-h-12 h-full normal-case"
          checked={values?.includes?.(option?.value as never) ?? false}
          onChange={onChange}
          disabled={disabled}
          value={option.value}
        >
          {option.label}
        </StatefulButton>
      </div>
    )
  })

  return (
    <div ref={ref}>
      {/* {labelDisplay} */}
      <div className={`flex flex-wrap lg:flex-nowrap gap-3 ${optionsContainerClassName ?? ''}`}>{optionsDisplay}</div>
      {error ? (
        <div className="mt-1 px-1 text-left">
          <ErrorTextMessage>{error.message ?? ''}</ErrorTextMessage>
        </div>
      ) : null}
      {hasError ? (
        <div className="mt-1 px-1">
          <ErrorMessage
            name={name ?? ''}
            errors={error}
            render={({ message }) => <ErrorTextMessage>{message}</ErrorTextMessage>}
          />
        </div>
      ) : null}
    </div>
  )
})

export interface RadioGroupInputProps {
  name?: string
  label?: ReactNode
  labelClassName?: string
  values: string[] | number[] | []
  buttonContainerClassName?: string
  optionsContainerClassName?: string
  options: InputOptions[]
  disabled?: boolean
  onChange?: FormEventHandler<HTMLButtonElement>
  readOnly?: boolean
  error?: FieldError
  required?: boolean
  tooltipText?: string
  isCurrentUsage?: boolean
  currentUsageType?: string
}

export interface InputOptions {
  value: string | number | undefined
  label: ReactNode
}

export default RadioGroupInput
