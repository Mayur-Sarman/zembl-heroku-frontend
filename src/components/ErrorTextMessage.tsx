// import { Typography } from '@material-tailwind/react'
import { PropsWithChildren } from 'react'

const ErrorTextMessage = ({ children }: PropsWithChildren) => {
  return (
    // <Typography color="red" className="text-sm font-medium">
    <p className="text-sm font-medium text-red-500">
      {children}
    </p>
  )
}

export default ErrorTextMessage
