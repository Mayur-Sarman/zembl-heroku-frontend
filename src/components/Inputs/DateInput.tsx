import { Typography } from '@material-tailwind/react'
import { ReactNode, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import Datepicker from 'tailwind-datepicker-react'
import { REQUIRED_VALIDATION, ValidationObject } from '../../constants/validation'
import ErrorTextMessage from '../ErrorTextMessage'

const DateInput = ({
  name,
  alwaysOpen,
  datepickerClassNames,
  defaultDate,
  label,
  control,
  disabled,
  readOnly,
  containerClassName,
  required,
  rules,
  minDate,
  maxDate,
  ...rest
}: DateInputProps) => {
  const [movingDateOpen, setMovingDateOpen] = useState<boolean>(alwaysOpen ?? false)

  const labelDisplay = label ? (
    <Typography
      variant="small"
      className={`mb-2 pl-1 ${required ? "after:content-['*'] after:text-red-500 after:ml-1" : ''}`}
    >
      {label}
    </Typography>
  ) : null

  return (
    <div className={`w-full ${!!disabled || !!readOnly ? 'pointer-events-none' : ''} ${containerClassName ?? ''}`}>
      {labelDisplay}
      <Controller
        name={name}
        control={control}
        rules={required ? { ...rules, ...REQUIRED_VALIDATION } : {}}
        render={({ field, fieldState }) => {
          return (
            <>
              <Datepicker
                onChange={field.onChange}
                show={movingDateOpen}
                {...rest}
                setShow={(prev) => setMovingDateOpen(alwaysOpen ?? prev)}
                options={{
                  minDate: minDate,
                  maxDate: maxDate,
                  clearBtn: false,
                  defaultDate: field.value
                    ? new Date(field.value as Date)
                    : defaultDate ?? (null as unknown as undefined),
                  datepickerClassNames: `left-0 ${datepickerClassNames} lg:left-auto`,
                  theme: {
                    background: 'bg-white dark:bg-zembl-p',
                    todayBtn: '!zembl-btn focus:ring-0',
                    clearBtn: 'focus:ring-0',
                    icons: '',
                    text: '',
                    disabledText: 'bg-grey-500',
                    input: `bg-white dark:bg-zembl-p border-blue-gray-200 focus:border-gray-900 ${
                      disabled ? 'pointer-events-none !bg-blue-gray-50 !border' : ''
                    }
                  ${readOnly ? 'pointer-events-none' : ''} ${fieldState.error ? '!border-red-500' : ''}`,
                    inputIcon: '',
                    selected: '',
                  },
                }}
              />
              {fieldState.error ? (
                <div className="mt-1 px-1 text-left">
                  <ErrorTextMessage>{fieldState.error?.message ?? ''}</ErrorTextMessage>
                </div>
              ) : null}
            </>
          )
        }}
      />
    </div>
  )
}

interface DateInputProps extends Partial<IDatePickerProps> {
  containerClassName?: string
  alwaysOpen?: boolean
  datepickerClassNames?: string
  defaultDate?: Date | null | undefined
  label?: ReactNode
  name: string
  control: Control
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  rules?: Record<string, ValidationObject>
  minDate?: Date
  maxDate?: Date
}

interface IDatePickerProps {
  children?: ReactNode
  options?: IOptions
  onChange?: (date: Date) => void
  classNames?: string
}

interface ITheme {
  background: string
  todayBtn: string
  clearBtn: string
  icons: string
  text: string
  disabledText: string
  input: string
  inputIcon: string
  selected: string
}

interface IIcons {
  prev: () => ReactNode | JSX.Element
  next: () => ReactNode | JSX.Element
}

export interface IOptions {
  title?: string
  autoHide?: boolean
  todayBtn?: boolean
  clearBtn?: boolean
  maxDate?: Date
  minDate?: Date
  theme?: ITheme
  icons?: IIcons
  datepickerClassNames?: string
  defaultDate?: Date | undefined
  language?: string
}

export default DateInput
