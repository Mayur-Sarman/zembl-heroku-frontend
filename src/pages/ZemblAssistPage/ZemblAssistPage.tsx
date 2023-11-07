import { Button, Typography } from '@material-tailwind/react'

import zemblLogo from '../../assets/zembl-icon.svg'
import { ZEMBL_WEBSITE_LINK } from '../../constants/misc'

const ZemblAssistPage = () => {
  const onBackClick = () => {
    window.location.href = ZEMBL_WEBSITE_LINK
  }

  return (
    <div className="flex flex-col text-center h-full justify-center">
      <div className="flex text-black flex-col gap-8 justify-center items-center py-8 px-6 sm:px-0">
        <img src={zemblLogo} alt="Zembl" className="w-24 md:w-auto"></img>
        <div>
          <Typography color="black" className="text-center text-base md:text-2xl font-normal">
            Thank you for contacting Zembl.
          </Typography>
          <Typography color="black" className="text-center text-base md:text-2xl font-normal">
            We will be in contact shortly to assist.
          </Typography>
        </div>
        <Button className="!zembl-btn" onClick={onBackClick}>
          Back to Zembl
        </Button>
      </div>
    </div>
  )
}

export default ZemblAssistPage
