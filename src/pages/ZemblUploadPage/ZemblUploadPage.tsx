import { Spinner, Typography } from '@material-tailwind/react'

import zemblLogo from '../../assets/zembl-icon.svg'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import FileUploadInput from '../../components/Inputs/FileUploadInput'
import { DOC_FILE_TYPE, JPEG_FILE_TYPE, MAX_FILE_SIZE, PDF_FILE_TYPE, PNG_FILE_TYPE } from '../../constants/file'
import PageNavigationActions from '../../components/PageNavigationActions'
import { transformFile } from '../../api/file'
import { useRegistration } from '../../hooks/useRegistration'
import { useEffect } from 'react'
import { useToast } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { ZEMBL_WEBSITE_LINK } from '../../constants/misc'

const SUPPORTED_FILE_TYPES = [PDF_FILE_TYPE, PNG_FILE_TYPE, JPEG_FILE_TYPE, DOC_FILE_TYPE].join(',')

const ZemblUploadPage = () => {
  const navigate = useNavigate()
  const { fireAlert } = useToast()
  const { registrationData, uploadFileMutation } = useRegistration()
  const { control, handleSubmit, formState } = useForm({ mode: 'all' })

  const onSubmit = async (data: FieldValues) => {
    const files = (data.billFile as FileList) ?? null
    const billFile = files?.[0] ?? null

    if (!billFile) return navigate('/zembl-assist')
    const sfFile = await transformFile(registrationData?.leadId ?? '', billFile)
    uploadFileMutation.mutate(sfFile)
  }

  const fileValidation = (value: FileList) => {
    const file = value?.[0] ?? null
    if (!file) return true
    if (file.size > MAX_FILE_SIZE) return 'File size must be less than 15MB.'
    if (!file?.type || !SUPPORTED_FILE_TYPES.includes(file.type)) return 'File type must be one of supported type (PDF, DOC, DOCX, JPG, PNG)'
    return true
  }

  // SUCCESS
  useEffect(() => {
    if (uploadFileMutation.isSuccess) {
      fireAlert({ children: 'File Uploaded', type: 'success', duration: 3000 })
      navigate('/zembl-assist')
    }
  }, [uploadFileMutation, fireAlert, navigate])

  // TODO: ERROR HANDLING (EXTRACT DATA)
  useEffect(() => {
    if (uploadFileMutation.isError && uploadFileMutation.error) {
      console.log(uploadFileMutation.error)
      fireAlert({ children: <Typography>Oops! Something has error!</Typography>, type: 'error' })
      return
    }
  }, [uploadFileMutation.isError, uploadFileMutation.error, fireAlert])

  const backdrop = uploadFileMutation.isLoading ? (
    <div className="w-full h-full absolute z-50 top-0 left-0 backdrop-blur-sm flex items-center justify-center">
      <Spinner className="h-16 w-16 m-auto absolute opacity-100" />
    </div>
  ) : null

  const alreadyUploaded = uploadFileMutation.isLoading || uploadFileMutation.isSuccess

  return (
    <div className="flex flex-col text-center h-full justify-center">
      {backdrop}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex text-black flex-col gap-8 justify-center items-center py-8 px-6 sm:px-0 w-full max-w-2xl mx-auto"
      >
        <img src={zemblLogo} alt="Zembl" className="w-24 md:w-auto"></img>
        <Typography color="black" className="text-center text-base md:text-2xl font-normal">
          Thank you for contacting Zembl.
        </Typography>
        <Typography color="black" className="text-center text-base md:text-2xl font-normal">
          We will be in contact shortly to assist.
        </Typography>
        <Controller
          name="billFile"
          control={control}
          rules={{ validate: { files: (value) => fileValidation(value as FileList) } }}
          render={({ field, fieldState }) => {
            return (
              <FileUploadInput
                {...field}
                wrapperClassName="max-w-xl"
                labelText="Upload Bill (Optional)"
                labelClassName="mb-4"
                dropzoneText="Click to upload or drag and drop"
                accept={SUPPORTED_FILE_TYPES}
                helpText="Supported PDF, DOC, DOCX, JPG, PNG files (MAX. 15MB)"
                error={fieldState.error}
                disabled={alreadyUploaded}
              />
            )
          }}
        />

        <PageNavigationActions
          containerClass="w-full md:w-3/4 max-screen-md"
          nextDisabled={!formState.isValid || alreadyUploaded}
          nextLabel="Upload"
          prevLabel="Back to Zembl"
          prevLink={ZEMBL_WEBSITE_LINK}
          prevExternal
        />
      </form>
    </div>
  )
}

export default ZemblUploadPage
