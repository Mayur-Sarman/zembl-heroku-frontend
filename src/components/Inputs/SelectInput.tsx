import { Option, Select, SelectOptionProps, SelectProps, Typography } from '@material-tailwind/react'
import { ForwardedRef, ReactNode, forwardRef } from 'react'

const SelectInput = forwardRef(function SelectInput(
  { options, textLabel, onChange, ...rest }: SelectInputProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const optionDisplay = options.map((opt) => (
    <Option key={opt.value} value={opt.value}>
      {opt.label}
    </Option>
  ))

  return (
    <div className="w-full">
      <Typography variant="small" className="mb-2 pl-1 md:text-base">
        {textLabel}
      </Typography>
      <Select
        {...rest}
        ref={ref}
        onChange={onChange}
        placeholder='Select...'
        className="!border !border-blue-gray-200 focus:!border-gray-900"
        labelProps={{ className: 'hidden' }}
      >
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
