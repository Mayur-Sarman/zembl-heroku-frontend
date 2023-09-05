import { CloudArrowUpIcon } from '@heroicons/react/20/solid'
import { Typography } from '@material-tailwind/react'
import { ChangeEventHandler, ReactNode } from 'react'

const FileUploadInput = ({
  onChange,
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
}: FileUploadInputProps) => {
  return (
    <div>
      {labelDisplay ? (
        labelDisplay
      ) : (
        <Typography variant="h5" className={`${labelClassName}`}>
          {labelText}
        </Typography>
      )}
      <div className={`flex items-center justify-center w-full ${containerClassName}`}>
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${dropzoneClassName}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudArrowUpIcon className={iconClassName} />
            <p className={`mb-2 text-sm text-gray-500 dark:text-gray-400 ${dropzoneTextClassName}`}>
              {dropzoneTextDisplay ? dropzoneTextDisplay : <span className="font-semibold">{dropzoneText}</span>}
            </p>
            {helpTextDisplay ? (
              helpTextDisplay
            ) : (
              <p className={`text-xs text-gray-500 dark:text-gray-400 ${helpTextClassName}`}>{helpText}</p>
            )}
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={onChange} />
        </label>
      </div>
    </div>
  )
}

interface FileUploadInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>
  name?: string
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
}

export default FileUploadInput
