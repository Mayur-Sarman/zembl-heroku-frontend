import { Input, InputProps, Typography } from '@material-tailwind/react'
import { ForwardedRef, ReactNode, forwardRef } from 'react'

const InputWithLabel = forwardRef(function InputWithLabel(
  { name, onChange, inputLabel, textLabel, className, ...rest }: InputWithLabelProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const textLabelDisplay = textLabel ? (
    <Typography variant="small" className="mb-2 pl-1">
      {textLabel}
    </Typography>
  ) : null

  return (
    <div className="text-left w-full">
      {textLabelDisplay}
      <Input
        label={inputLabel}
        name={name}
        onChange={onChange}
        {...rest}
        ref={ref}
        crossOrigin=""
        placeholder={inputLabel ?? rest.label}
        className={`!border !border-blue-gray-200 focus:!border-gray-900 ${className}`}
        labelProps={{ className: 'hidden' }}
      />
    </div>
  )
})

interface InputWithLabelProps extends InputProps {
  inputLabel?: string
  textLabel?: ReactNode
}

export default InputWithLabel
