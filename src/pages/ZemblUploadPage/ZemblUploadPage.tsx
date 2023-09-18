import { Button, Typography } from '@material-tailwind/react'

import zemblLogo from '../../assets/zembl-icon.svg'
import { FieldError, useForm } from 'react-hook-form'
import FileUploadInput from '../../components/Inputs/FileUploadInput'

const ZemblUploadPage = () => {
  const { register, handleSubmit, formState } = useForm()

  const onSubmit = (data: Record<string, string>) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col text-center h-full justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex text-black flex-col gap-8 justify-center items-center py-8 px-6 sm:px-0"
      >
        <img src={zemblLogo} alt="Zembl" className="w-24 md:w-auto"></img>
        <Typography color="black" className="text-center text-base md:text-2xl font-normal">
          Thank you for contacting Zembl.
        </Typography>
        <Typography color="black" className="text-center text-base md:text-2xl font-normal">
          We will be in contact shortly to assist.
        </Typography>
        <FileUploadInput
          {...register('billFile')}
          wrapperClassName="max-w-xl"
          labelText="Upload Bill (Optional)"
          labelClassName="mb-4"
          dropzoneText="Click to upload or drag and drop"
          helpText="PDF (MAX. 4MB)"
          error={formState.errors?.billFile as FieldError}
        />

        <Button type="submit" className="!zembl-btn">
          Upload
        </Button>
      </form>
    </div>
  )
}

export default ZemblUploadPage
