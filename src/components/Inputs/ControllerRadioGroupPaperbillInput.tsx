import { Control, Controller } from 'react-hook-form'
import RadioGroupInput, { InputOptions, RadioGroupInputProps } from './RadioGroupInput'
import { REQUIRED_VALIDATION, ValidationObject } from '../../constants/validation'

const ControllerRadioGroupPaperbillInput = ({
  control,
  name,
  hidden,
  options,
  rules,
  required,
  tooltipText,
  isCurrentUsage, 
  currentUsageType,
  ...rest
}: ControllerRadioGroupPaperbillInputProps) => {
  const combinedRules = required ? { ...rules, ...REQUIRED_VALIDATION } : { ...rules }
  if (hidden) return null
  return (
    <Controller
      control={control}
      name={name}
      rules={combinedRules}
      render={({ field, fieldState }) => {
        return (
          <RadioGroupInput
            {...field}
            error={fieldState.error}
            {...rest}
            values={[field.value]}
            options={options}
            required={!!combinedRules?.required ?? required}
            tooltipText={tooltipText}
            isCurrentUsage={isCurrentUsage}
            currentUsageType={currentUsageType}
          />
        )
      }}
    />
  )
}

interface ControllerRadioGroupPaperbillInputProps extends Partial<RadioGroupInputProps> {
  control: Control
  name: string
  hidden?: boolean
  rules?: Record<string, ValidationObject>
  required?: boolean
  options: InputOptions[]
  tooltipText?: string
  isCurrentUsage?: boolean
  currentUsageType?: string
}

export default ControllerRadioGroupPaperbillInput
