import { Input, InputProps, Typography } from '@material-tailwind/react'
import { ForwardedRef, ReactNode, forwardRef } from 'react'

const InputWithLabel = forwardRef(function InputWithLabel(
  { name, onChange, inputLabel, textLabel, ...rest }: InputWithLabelProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const textLabelDisplay = textLabel ? (
    <Typography variant="small" className="mb-2 pl-1">
      {textLabel}
    </Typography>
  ) : null

  return (
    <div className="text-left">
      {textLabelDisplay}
      <Input label={inputLabel} name={name} onChange={onChange} {...rest} ref={ref} crossOrigin="" />
    </div>
  )
})

interface InputWithLabelProps extends InputProps {
  inputLabel?: string
  textLabel?: ReactNode
}

export default InputWithLabel
