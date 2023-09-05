import { Option, Select, SelectOptionProps, SelectProps, Typography } from '@material-tailwind/react'
import { ForwardedRef, ReactNode, forwardRef } from 'react'

const SelectInput = forwardRef(function SelectInput(
  { options, textLabel, ...rest }: SelectInputProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const optionDisplay = options.map((opt) => (
    <Option key={opt.value} value={opt.value}>
      {opt.label}
    </Option>
  ))

  return (
    <div className="w-full">
      <Typography variant="small" className="mb-2 pl-1">
        {textLabel}
      </Typography>
      <Select {...rest} ref={ref}>
        {optionDisplay}
      </Select>
    </div>
  )
})

interface SelectInputProps extends Partial<SelectProps> {
  options: SelectOption[]
  textLabel: string
}

interface SelectOption extends Partial<SelectOptionProps> {
  value: string | undefined
  label: ReactNode
}

export default SelectInput
