import { Button, Typography } from '@material-tailwind/react'

import zemblLogo from '../../assets/zembl-icon.svg'
import { useNavigate } from 'react-router-dom'

const ThankyouPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col text-center h-full justify-center">
      <div className="flex text-black flex-col gap-8 justify-center items-center py-8 px-6 sm:px-0 w-full">
        <img src={zemblLogo} alt="Zembl" className="w-24 md:w-auto"></img>
        <div className="flex flex-col gap-4 max-w-screen-sm">
          <Typography className="text-center text-base md:text-2xl font-normal text-zembl-p mb-4">
            Thanks for Zembling your energy rates
          </Typography>
          <Typography className="text-center text-base md:text-xl font-semibold text-zembl-p">As a reminder</Typography>
          <Typography className="text-center text-base font-normal text-zembl-p">
            Re-Zembl is our free auto-renewal service for your energy contract.
          </Typography>
          <Typography className="text-center text-base font-normal text-zembl-p">
            As your 2-year anniversary approaches, we’ll automatically source a new competitive energy offer from our
            panel of retailers.
          </Typography>
        </div>
        <Button className="bg-zembl-action-primary text-zembl-p m-auto" onClick={() => navigate('/')}>
          Back to Zembl
        </Button>
      </div>
    </div>
  )
}

export default ThankyouPage
