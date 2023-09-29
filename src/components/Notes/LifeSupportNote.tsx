import TextNote from '../TextNote'
import { Typography } from '@material-tailwind/react'

const LifeSupportNote = () => {
  return (
    <TextNote>
      <Typography className="font-normal">
        You have indicated that someone in the property has life support equipment.
      </Typography>
    </TextNote>
  )
}

export default LifeSupportNote
