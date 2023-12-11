import TextNote from '../TextNote'
import { Typography } from '@material-tailwind/react'

const ReZemblNote = () => {
  return (
    <TextNote className={'text-sm'}>
      <Typography variant="h6">Like to save time down the line? Re-Zembl is how.</Typography>
      <Typography className={'text-sm'}>Re-Zembl is our free auto-renewal service for your energycontract.</Typography>
      <Typography className={'text-sm'}>
        As your 2-year anniversary approaches, we’ll automatically source a new competitive energy offer from our panel
        of retailers.
      </Typography>
      <Typography className={'text-sm'}>
        It’ll keep your rates competitive and save you time arranging energy deals over and over. You can cancel at any
        time.
      </Typography>
      <ul className="list-disc px-6">
        <li>Keeps rates competitive</li>
        <li>Saves time & hassle</li>
        <li>Free Zembl service</li>
        <li>Cancel at any time</li>
      </ul>
    </TextNote>
  )
}

export default ReZemblNote
