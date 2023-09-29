import { CloudArrowUpIcon } from '@heroicons/react/20/solid'
import { Typography } from '@material-tailwind/react'
import { ChangeEvent, DragEvent, ForwardedRef, ReactNode, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import ErrorTextMessage from '../ErrorTextMessage'
import AttachmentBadge from '../AttachmentBadge'

const FileUploadInput = forwardRef(function FileUploadInput(
  {
    onChange,
    wrapperClassName,
    containerClassName,
    dropzoneClassName,
    iconClassName = 'h-10 w-10',

    dropzoneText,
    dropzoneTextDisplay,
    dropzoneTextClassName,

    labelText,
    labelDisplay,
    labelClassName,

    helpText,
    helpTextDisplay,
    helpTextClassName,

    error,

    accept,
    value,
    disabled,
  }: FileUploadInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files)
  }

  const onDropHandler = (event: DragEvent<HTMLInputElement>) => {
    event.preventDefault()
    onChange(event.dataTransfer.files)
  }

  const allowDrop = (event: DragEvent<HTMLInputElement>) => {
    event.preventDefault()
  }

  return (
    <div className={`w-full ${wrapperClassName ?? ''}`}>
      {labelDisplay ? (
        labelDisplay
      ) : (
        <Typography variant="h5" className={`${labelClassName ?? ''}`}>
          {labelText}
        </Typography>
      )}
      <div
        className={`flex items-center justify-center w-full ${containerClassName ?? ''}`}
        onDragOver={allowDrop}
        onDrop={onDropHandler}
      >
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${dropzoneClassName}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudArrowUpIcon className={iconClassName} />
            <p className={`mb-2 text-sm text-gray-500 dark:text-gray-400 ${dropzoneTextClassName ?? ''}`}>
              {dropzoneTextDisplay ? dropzoneTextDisplay : <span className="font-semibold">{dropzoneText}</span>}
            </p>
            {helpTextDisplay ? (
              helpTextDisplay
            ) : (
              <p className={`text-xs text-gray-500 dark:text-gray-400 ${helpTextClassName ?? ''}`}>{helpText}</p>
            )}
          </div>
          <input
            id="dropzone-file"
            ref={ref}
            type="file"
            className="hidden"
            onChange={onChangeHandler}
            accept={accept}
            disabled={disabled}
          />
        </label>
      </div>

      {error ? (
        <div className="mt-1 px-1 text-left">
          <ErrorTextMessage>{error.message}</ErrorTextMessage>
        </div>
      ) : null}
      <div className="mt-2">
        {Array.from(value ?? []).map((item, index) => {
          return (
            <AttachmentBadge
              key={`${index}_${item.name}`}
              file={item}
              fileName={item.name}
              variant='outlined'
              className="w-max text-zembl-p bg-zembl-action-primary border-0"
              onClose={() => onChange(null)}
            />
          )
        })}
      </div>
    </div>
  )
})

interface FileUploadInputProps {
  onChange: (event: FileList | null) => void
  name?: string
  accept?: string
  maxFileSize?: number
  wrapperClassName?: string
  containerClassName?: string
  dropzoneClassName?: string
  iconClassName?: string

  dropzoneText?: string
  dropzoneTextDisplay?: ReactNode
  dropzoneTextClassName?: string

  labelText?: string
  labelDisplay?: ReactNode
  labelClassName?: string

  helpText?: string
  helpTextDisplay?: ReactNode
  helpTextClassName?: string

  error?: FieldError
  value?: FileList
  disabled?: boolean
}

export default FileUploadInput
