import { CheckIcon } from '@heroicons/react/20/solid'
import { ErrorMessage } from '@hookform/error-message'
import { Radio } from '@material-tailwind/react'
import { ReactNode } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import ErrorTextMessage from '../ErrorTextMessage'
import { REQUIRED_VALIDATION } from '../../constants/validation'

const RadioCheckGroupInput = ({
  name,
  register,
  required,
  options,
  containerClassName,
  errors,
}: RadioCheckGroupInputProps) => {
  const hasError = !!errors?.[name]
  const rules = required ? { ...REQUIRED_VALIDATION } : null

  const selectionDisplay = options.map((item) => (
    <Radio
      key={item.value}
      label={item.label}
      value={item.value}
      {...register(name, { ...rules })}
      className={`${item.className ?? ''}`}
      labelProps={{ className: 'text-sm' }}
      crossOrigin={undefined}
      defaultChecked={item.default}
      icon={<CheckIcon height={12} width={12} />}
    />
  ))
  return (
    <div className={`flex flex-wrap gap-x-3 justify-center ${containerClassName ?? ''}`}>
      {selectionDisplay}
      {hasError ? (
        <div className="mt-1 px-1 w-full">
          <ErrorMessage
            name={name}
            errors={errors ?? {}}
            render={({ message }) => <ErrorTextMessage>{message}</ErrorTextMessage>}
          />
        </div>
      ) : null}
    </div>
  )
}

interface RadioCheckGroupInputProps {
  options: RadioCheckOption[]
  register: UseFormRegister<FieldValues>
  name: string
  containerClassName?: string
  required?: boolean
  errors?: FieldErrors<FieldValues>
}

interface RadioCheckOption {
  label: string
  value: string
  icon?: ReactNode
  className?: string
  default?: boolean
}

export default RadioCheckGroupInput
