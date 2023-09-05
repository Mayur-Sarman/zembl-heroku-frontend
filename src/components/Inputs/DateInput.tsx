import { ReactNode, useState } from 'react'
import Datepicker from 'tailwind-datepicker-react'

const DateInput = ({ alwaysOpen, onChange, datepickerClassNames, defaultDate }: DateInputProps) => {
  const [movingDateOpen, setMovingDateOpen] = useState<boolean>(alwaysOpen ?? false)

  return (
    <Datepicker
      show={movingDateOpen}
      setShow={(prev) => setMovingDateOpen(alwaysOpen ?? prev)}
      onChange={onChange}
      options={{
        defaultDate: defaultDate,
        datepickerClassNames: datepickerClassNames,
        theme: {
          background: 'bg-white dark:bg-zembl-p',
          todayBtn: 'bg-zembl-action-primary text-zembl-p',
          clearBtn: '',
          icons: '',
          text: '',
          disabledText: 'bg-grey-500',
          input: 'bg-white dark:bg-zembl-p',
          inputIcon: '',
          selected: '',
        },
      }}
    />
  )
}

interface DateInputProps extends IDatePickerProps {
  alwaysOpen?: boolean
  datepickerClassNames?: string
  defaultDate?: Date | undefined
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
