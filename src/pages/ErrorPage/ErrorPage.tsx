import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Button, Typography } from '@material-tailwind/react'
// import Header from '../../components/Header'
// import Footer from '../../components/Footer'

import zemblLogo from '../../assets/zembl-icon.svg'
import { useEffect } from 'react'
// import { useCreateLogDataMutation } from '../../hooks/useCreateLogMutation'
// import { useRegistration } from '../../hooks/useRegistration'
import FileUploadInput from '../../components/Inputs/FileUploadInput'

const ErrorPage = () => {
  // const { registrationToken } = useRegistration()
  const { control } = useForm()
  const navigate = useNavigate()
  // const routerError: unknown & { statusText: string; message: string } = useRouteError()
  const error = useRouteError()
  let errorMessage = ''
  let errorTitle = 'An unexpected error has occurred.'
  let errorStackTrace = ''
  let shouldSaveLog = true




  // const logMutation = useCreateLogDataMutation(registrationToken ?? '')

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorTitle = `Page not found`
    errorMessage = error.error?.message ?? error.statusText
    errorStackTrace = error.error?.stack ?? ''
    shouldSaveLog = false
  } else if (error instanceof Error) {
    errorMessage = error.message
    errorStackTrace = error?.stack ?? ''
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = 'Unknown error'
  }

  useEffect(() => {
    // if (errorMessage && logMutation?.isIdle && shouldSaveLog) {
    //   logMutation.mutate({
    //     errorMessage,
    //     endpoint: 'Web Error',
    //     response: errorStackTrace,
    //     status: 'ERROR',
    //     source: 'Web',
    //   })
    // }
  }, [errorMessage, errorStackTrace, shouldSaveLog])

  // useEffect(() => {
  //   return () => logMutation.reset()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <div className="flex flex-col justify-between h-screen">
      {/* <Header /> */}
      <div className="flex text-black flex-col gap-8 justify-center items-center py-8 px-6 sm:px-0">
        <img src={zemblLogo} alt="Zembl"></img>
        <Typography variant="h6" color="black" className="text-center">
          {errorTitle}
        </Typography>
        <Typography variant="h6" className="text-slate-400">
          <i>{errorMessage}</i>
        </Typography>
        <Controller
          name="billFile"
          control={control}
          render={({ field }) => {
            return (
              <FileUploadInput
                {...field}
                wrapperClassName="max-w-xl"
                labelText="Upload Bill (Optional)"
                labelClassName="mb-4"
                dropzoneText="Click to upload or drag and drop"

                helpText="Supported PDF, DOC, DOCX, JPG, PNG files (MAX. 15MB)"
              />
            )
          }}
        />
        <Button className="!zembl-btn" onClick={() => navigate('..')}>
          Back to Zembl
        </Button>
      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default ErrorPage
