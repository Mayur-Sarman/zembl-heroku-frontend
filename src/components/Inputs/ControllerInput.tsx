import { Control, Controller } from 'react-hook-form'
import InputWithLabel, { InputWithLabelProps } from './InputWithLabel'
import { REQUIRED_VALIDATION } from '../../constants/validation'

const ControllerInput = ({ name, control, rules, required, ...rest }: ControllerInputProps) => {
  let computedRules = { ...rules }
  if (required) computedRules = { ...rules, ...REQUIRED_VALIDATION }
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      rules={computedRules}
      render={({ field, fieldState }) => {
        return (
          <InputWithLabel
            {...rest}
            required={required ?? !!computedRules?.required}
            fieldError={fieldState.error}
            {...field}
            value={field.value as string ?? ''}
            ref={field.ref}
          />
        )
      }}
    ></Controller>
  )
}

interface ControllerInputProps extends InputWithLabelProps {
  name: string
  control: Control
  rules?: Record<string, unknown>
  required?: boolean
}

export default ControllerInput
