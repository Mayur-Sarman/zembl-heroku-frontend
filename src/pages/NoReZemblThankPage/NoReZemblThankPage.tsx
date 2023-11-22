import { Button, Typography } from '@material-tailwind/react'

import zemblLogo from '../../assets/zembl-icon.svg'
import { useNavigate } from 'react-router-dom'

const NoReZemblThankPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col text-center h-full justify-center">
      <div className="flex text-black flex-col gap-8 justify-center items-center py-8 px-6 sm:px-0 w-full">
        <img src={zemblLogo} alt="Zembl" className="w-24 md:w-auto"></img>
        <div className="flex flex-col gap-4 max-w-screen-md">
          <Typography className="text-center text-base md:text-2xl font-normal text-zembl-p mb-4">
            You have accepted your new energy offer. Please keep an eye on your email inbox for further communications
            from Zembl and your energy provider. If you have any questions, please do not hesitate to get in touch with
            us on 1300 957 721.
          </Typography>
        </div>
        <Button className="capitalize !zembl-btn m-auto" onClick={() => navigate('/')}>
          Back to Zembl
        </Button>
      </div>
    </div>
  )
}

export default NoReZemblThankPage
