import { Typography } from '@material-tailwind/react'

import zemblLogo from '../../assets/zembl-icon.svg'

const ABNErrorPage = () => {
  return (
    <div className="flex flex-col text-center h-full justify-center">
      <div id="error-page" className="flex text-black flex-col gap-8 justify-center items-center py-8 px-6 sm:px-0">
        <img src={zemblLogo} alt="Zembl" className="w-24 md:w-auto"></img>
        <div>
          <Typography color="black" className="text-center text-base md:text-2xl font-normal">
            We need to obtain more information from you.
          </Typography>
          <Typography color="black" className="text-center text-base md:text-2xl font-normal">
            An Energy Expert will be in contact shortly.
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default ABNErrorPage
