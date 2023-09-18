import { Control, Controller } from 'react-hook-form'
import RadioGroupInput, { InputOptions, RadioGroupInputProps } from './RadioGroupInput'
import { REQUIRED_VALIDATION, ValidationObject } from '../../constants/validation'

const ControllerRadioGroupInput = ({
  control,
  name,
  hidden,
  options,
  rules,
  required,
  ...rest
}: ControllerRadioGroupInputProps) => {
  const combinedRules = required ? { ...rules, ...REQUIRED_VALIDATION } : { ...rules }
  return (
    <Controller
      control={control}
      name={name}
      rules={combinedRules}
      render={({ field, fieldState }) => {
        if (hidden) return <></>
        return (
          <RadioGroupInput
            {...field}
            error={fieldState.error}
            {...rest}
            values={[field.value]}
            options={options}
            required={!!combinedRules?.required ?? required}
          />
        )
      }}
    />
  )
}

interface ControllerRadioGroupInputProps extends Partial<RadioGroupInputProps> {
  control: Control
  name: string
  hidden?: boolean
  rules?: Record<string, ValidationObject>
  required?: boolean
  options: InputOptions[]
}

export default ControllerRadioGroupInput
