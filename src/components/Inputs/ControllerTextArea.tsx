import { TextareaProps } from '@material-tailwind/react'
import { Control, Controller } from 'react-hook-form'
import { REQUIRED_VALIDATION, ValidationObject } from '../../constants/validation'
import { ForwardedRef, forwardRef } from 'react'
import TextAreaWithLabel from './TextAreaWithLabel'

const ControllerTextArea = forwardRef(function ControllerTextArea(
  { control, name, required, rules, ...rest }: ControllerTextAreaProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  let computedRules = { ...rules }
  if (required) computedRules = { ...rules, ...REQUIRED_VALIDATION }

  return (
    <Controller
      name={name}
      control={control}
      rules={computedRules}
      render={({ field }) => {
        return <TextAreaWithLabel {...field} {...rest} ref={ref} />
      }}
    />
  )
})

interface ControllerTextAreaProps extends TextareaProps {
  name: string
  control: Control
  rules?: Record<string, ValidationObject>
  required?: boolean
}

export default ControllerTextArea
