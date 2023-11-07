import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { Typography } from '@material-tailwind/react'
import { PropsWithChildren } from 'react'
import RegistrationContext from '../../contexts/RegistrationContext'
import { useContext } from 'react'
import { REGISTRATION_TYPE_BUSINESS } from '../../constants'

const CheckIcon = ({ children }: PropsWithChildren) => {
  return (
    <span className="flex gap-1 text-zembl-p items-center">
      <CheckCircleIcon fill="#8EFF95" viewBox="1 1 18 18" className="w-5 h-5 bg-zembl-p rounded-full" />
      <Typography variant="small" className="text-xs lg:text-base">
        {children}
      </Typography>
    </span>
  )
}

  

const BasicInfoPageTitle = () => {
  const { registrationData } = useContext(RegistrationContext)
  return (
    <div className="flex flex-col gap-y-3 items-center">
      <Typography variant="h1" className="text-zembl-p text-3xl md:text-5xl">
        Compare energy plans
      </Typography>
      <Typography variant="small" className="text-zembl-p px-12 lg:text-base max-w-lg">
        Please have at hand the following
      </Typography>
      <div className="flex flex-col gap-x-3 gap-y-1 md:flex-row">
        <span className="flex gap-1 text-zembl-p items-center">
          <CheckIcon>Latest Bill</CheckIcon>
        </span>
        <span className="flex gap-1 text-zembl-p items-center">
          <CheckIcon>Drivers License, Passport or Medicare Card</CheckIcon>
        </span>
        {registrationData?.accountType === REGISTRATION_TYPE_BUSINESS ? 
        <span className="flex gap-1 text-zembl-p items-center">
          <CheckIcon>ABN</CheckIcon>
        </span> : null}
      </div>
    </div>
  )
}

export default BasicInfoPageTitle
