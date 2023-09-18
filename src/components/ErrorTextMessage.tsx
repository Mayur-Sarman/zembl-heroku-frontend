import { Typography } from '@material-tailwind/react'
import { PropsWithChildren } from 'react'

const ErrorTextMessage = ({ children }: PropsWithChildren) => {
  return (
    <Typography color="red" className="text-sm font-medium">
      {children}
    </Typography>
  )
}

export default ErrorTextMessage
