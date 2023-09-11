import { Typography } from '@material-tailwind/react'
import { toNumber } from 'lodash'
import { ChangeEvent, ChangeEventHandler, ClipboardEventHandler, MouseEventHandler } from 'react'
import { Control, Controller, FieldValues, UseFormSetValue } from 'react-hook-form'

const CODE_DIGITS = 4
const INPUT_CLASS =
  'peer bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent px-3 py-2.5 rounded-[7px] !border !border-blue-gray-200 focus:!border-gray-900 w-12 h-12 lg:w-20 lg:h-20 text-lg lg:text-3xl text-center'

const VerificationCodeInput = ({ control, onResendClicked, setValue, phoneNumber }: VerificationCodeInputProps) => {
  const onVerificationDigitInput = (
    e: ChangeEvent,
    callback: ChangeEventHandler<Element>,
    value: string,
    index: number,
  ) => {
    const target: HTMLInputElement = e.target as HTMLInputElement
    const inputValue: string = target.value
    const nextElement: HTMLInputElement = target.nextElementSibling as HTMLInputElement
    const prevElement: HTMLInputElement = target.previousElementSibling as HTMLInputElement

    if (inputValue) {
      const updatedValue = [...value]
      updatedValue[index] = inputValue

      const newValue = updatedValue.join('')

      // const newValue = (value += inputValue.trim())
      target.value = newValue

      if (!toNumber(newValue)) {
        return
      }

      if (nextElement && newValue[index]) {
        nextElement.focus()
      }
    } else {
      const newValue = value.slice(0, value.length - 1)
      target.value = newValue
      if (prevElement && !newValue[index]) {
        prevElement.focus()
      }
    }

    return callback(e)
  }

  const onCodePasted: ClipboardEventHandler<HTMLInputElement> = (e) => {
    const dataTransfer: DataTransfer = e.clipboardData
    const code: string = dataTransfer.getData('Text')

    if (!toNumber(code)) {
      return
    }

    setValue('verificationCode', code.slice(0, 4))
  }

  return (
    <div className="w-full text-center p-4">
      <Typography className="text-sm lg:text-base font-normal text-zembl-p">
        A text message with a verification code was sent to {phoneNumber}
      </Typography>
      <div className="flex relative p-6 justify-center">
        <Controller
          name="verificationCode"
          control={control}
          render={({ field }) => {
            const fieldValue: string = (field.value as string) ?? ''
            const inputDigits = Array.from(new Array(CODE_DIGITS)).map((_, index) => (
              <input
                key={index}
                className={INPUT_CLASS}
                maxLength={1}
                value={fieldValue[index] ?? ''}
                onChange={(e) => onVerificationDigitInput(e, field.onChange, fieldValue, index)}
                onPaste={onCodePasted}
              />
            ))
            return <div className="flex gap-2 lg:gap-3 justify-center z-[1]">{inputDigits}</div>
          }}
        />
        <hr className="border-b border-zembl-p absolute w-48 lg:w-72 top-1/2" />
      </div>
      <Typography
        onClick={onResendClicked}
        variant="small"
        className="text-sm lg:text-base underline cursor-pointer text-gray-400 hover:text-gray-600 focus:text-gray-600 active:text-gray-600"
      >
        Resend verification code
      </Typography>
    </div>
  )
}

interface VerificationCodeInputProps {
  control: Control
  onResendClicked: MouseEventHandler
  setValue: UseFormSetValue<FieldValues>
  phoneNumber: string
}

export default VerificationCodeInput
