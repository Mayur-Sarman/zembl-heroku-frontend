import { Control, Controller } from 'react-hook-form'
import SelectInput, { SelectInputProps } from './SelectInput'
import { REQUIRED_VALIDATION, ValidationObject } from '../../constants/validation'
import { SelectOption } from '../../constants'

const ControllerSelectInput = ({ name, control, rules, options, required, ...rest }: ControllerSelectInputProps) => {
  let computedRules = { ...rules }
  if (required) computedRules = { ...rules, ...REQUIRED_VALIDATION }

  const isRequired = !!computedRules?.required

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <SelectInput {...rest} options={options} {...field} required={isRequired} fieldError={fieldState.error} />
        )
      }}
    />
  )
}

interface ControllerSelectInputProps extends SelectInputProps {
  name: string
  control: Control
  rules?: Record<string, ValidationObject>
  options: SelectOption[]
}

export default ControllerSelectInput
