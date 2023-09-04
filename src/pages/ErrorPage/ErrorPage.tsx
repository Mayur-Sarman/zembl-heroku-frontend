import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'

import { Button, Typography } from '@material-tailwind/react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import zemblLogo from '../../assets/zembl-icon.svg'

const ErrorPage = () => {
  const navigate = useNavigate();
  // const routerError: unknown & { statusText: string; message: string } = useRouteError()
  const error = useRouteError()
  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message ?? error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = 'Unknown error'
  }

  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <div id="error-page" className="flex text-black flex-col gap-8 justify-center items-center py-8 px-6 sm:px-0">
        <img src={zemblLogo} alt="Zembl"></img>
        <Typography variant="h6" color="black" className="text-center">
          Opps! An unexpected error has occurred.
        </Typography>
        <Typography variant="h6" className="text-slate-400">
          <i>{errorMessage}</i>
        </Typography>
        <Button className='bg-zembl-action-primary text-zembl-p' onClick={() => navigate('..')}>Back to Zembl</Button>
      </div>
      <Footer />
    </div>
  )
}

export default ErrorPage
