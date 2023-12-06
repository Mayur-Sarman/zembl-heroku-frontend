import { Button, Typography } from '@material-tailwind/react'

import zemblLogo from '../../assets/zembl-icon.svg'
import { useNavigate } from 'react-router-dom'

const ReZemblThankPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col text-center h-full justify-center">
      <div className="flex text-black flex-col gap-8 justify-center items-center py-8 px-6 sm:px-0 w-full">
        <img src={zemblLogo} alt="Zembl" className="w-24 md:w-auto"></img>
        <div className="flex flex-col gap-4 max-w-screen-md">
          <Typography className="text-center text-xl md:text-3xl font-normal text-zembl-p mb-4">
            Thanks for accepting Re-Zembl
          </Typography>
          <Typography className="text-center text-lg md:text-2xl font-semibold text-zembl-p mb-4">
            As a reminder
          </Typography>
          <Typography className="text-center text-base md:text-xl font-normal text-zembl-p mb-4">
            Re-Zembl is our free auto-renewal service for your energy contract.
          </Typography>
          <Typography className="text-center text-base md:text-xl font-normal text-zembl-p mb-4">
            As your 2-year anniversary approaches, we’ll automatically source a new competitive energy offer from our
            panel of retailers.
          </Typography>
        </div>
        <Button className="capitalize !zembl-btn m-auto" onClick={() => navigate('/')}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default ReZemblThankPage
