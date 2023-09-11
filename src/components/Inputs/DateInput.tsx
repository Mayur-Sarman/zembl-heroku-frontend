import { Typography } from '@material-tailwind/react'
import { ReactNode, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import Datepicker from 'tailwind-datepicker-react'

const DateInput = ({
  name,
  alwaysOpen,
  datepickerClassNames,
  defaultDate,
  label,
  control,
  disabled,
  readOnly,
  ...rest
}: DateInputProps) => {
  const [movingDateOpen, setMovingDateOpen] = useState<boolean>(alwaysOpen ?? false)

  const labelDisplay = label ? (
    <Typography variant="small" className="mb-2 pl-1">
      {label}
    </Typography>
  ) : null

  return (
    <div className={`w-full ${!!disabled || !!readOnly ? 'pointer-events-none' : ''}`}>
      {labelDisplay}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Datepicker
              onChange={field.onChange}
              show={movingDateOpen}
              {...rest}
              setShow={(prev) => setMovingDateOpen(alwaysOpen ?? prev)}
              options={{
                defaultDate: defaultDate,
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
                  ${readOnly ? 'pointer-events-none' : ''}`,
                  inputIcon: '',
                  selected: '',
                },
              }}
            />
          )
        }}
      />
    </div>
  )
}

interface DateInputProps extends IDatePickerProps {
  alwaysOpen?: boolean
  datepickerClassNames?: string
  defaultDate?: Date | undefined
  label?: ReactNode
  name: string
  control: Control
  disabled?: boolean
  readOnly?: boolean
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
