import { Typography } from '@material-tailwind/react'
import StatefulButton from './StatefulButton'
import { FormEventHandler, ForwardedRef, ReactNode, forwardRef } from 'react'

const RadioGroupInput = forwardRef(function RadioGroupInput(
  { label, disabled, values, onChange, buttonContainerClassName, optionsContainerClassName, options, readOnly }: RadioGroupInputProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const labelDisplay = label ? (
    <Typography variant="small" className="mb-2 pl-1">
      {label}
    </Typography>
  ) : null

  const optionsDisplay: ReactNode[] = options.map((option) => {
    const className = buttonContainerClassName ?? `w-full lg:w-1/3 ${buttonContainerClassName ?? ''} ${readOnly ? 'pointer-events-none' : ''}`
    return (
      <div key={option.value} className={className}>
        <StatefulButton
          className="h-12"
          checked={values.includes(option.value as never)}
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
      {labelDisplay}
      <div className={`${optionsContainerClassName ?? 'flex flex-wrap lg:flex-nowrap gap-3'}`}>{optionsDisplay}</div>
    </div>
  )
})

interface RadioGroupInputProps {
  label?: ReactNode
  values: string[] | number[] | []
  buttonContainerClassName?: string
  optionsContainerClassName?: string
  options: InputOptions[]
  disabled?: boolean
  onChange?: FormEventHandler<HTMLButtonElement>
  readOnly?: boolean
}

export interface InputOptions {
  value: string | number | undefined
  label: ReactNode
}

export default RadioGroupInput
