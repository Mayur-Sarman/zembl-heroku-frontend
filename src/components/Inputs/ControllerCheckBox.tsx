import { Checkbox } from '@material-tailwind/react'
import { Control, Controller } from 'react-hook-form'
import { REQUIRED_VALIDATION, ValidationObject } from '../../constants/validation'

const ControllerCheckBox = ({ label, control, name, required, rules, ...rest }: ControllerCheckBoxProps) => {
  let computedRules = { ...rules }
  if (required) computedRules = { ...rules, ...REQUIRED_VALIDATION }

  const isRequired = !!computedRules?.required

  return (
    <Controller
      name={name}
      control={control}
      rules={computedRules}
      render={({ field }) => {
        return (
          <Checkbox
            {...field}
            label={label}
            labelProps={{ className: `${isRequired ? `after:content-['*'] after:text-red-500 after:ml-1` : ''}` }}
            {...rest}
            required={isRequired}
            crossOrigin={''}
          />
        )
      }}
    />
  )
}

interface ControllerCheckBoxProps {
  label: string
  control: Control
  name: string
  required?: boolean
  rules?: Record<string, ValidationObject>
}

export default ControllerCheckBox
