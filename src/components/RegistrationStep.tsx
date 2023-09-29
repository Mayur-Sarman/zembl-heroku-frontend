import {
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  DocumentCheckIcon,
  IdentificationIcon,
  UserIcon,
} from '@heroicons/react/20/solid'
import { Step, Stepper, Typography } from '@material-tailwind/react'

const ICON_CLASS = 'h-5 w-5'
const COMPLETED_CLASS_NAME = '!zembl-btn active:!bg-zembl-action-primary'

const RegistrationStep = ({ currentStep, containerClassName }: { currentStep: number, containerClassName?: string }) => {
  return (
    <div className={`lg:h-32 lg:py-3 lg:px-14 lg:mt-6 ${containerClassName ?? ''}`}>
      <div className="hidden lg:block">
        <Stepper activeStep={currentStep}>
          <Step activeClassName={COMPLETED_CLASS_NAME} completedClassName={COMPLETED_CLASS_NAME}>
            <IdentificationIcon className={ICON_CLASS} />
            <div className="absolute -bottom-[4rem] w-max text-center">
              <Typography variant="h6">Step 1</Typography>
              <Typography className="font-light">Basic Info</Typography>
            </div>
          </Step>
          <Step activeClassName={COMPLETED_CLASS_NAME} completedClassName={COMPLETED_CLASS_NAME}>
            <ClipboardDocumentListIcon className={ICON_CLASS} />
            <div className="absolute -bottom-[4rem] w-max text-center">
              <Typography variant="h6">Step 2</Typography>
              <Typography className="font-light">Plan Listing</Typography>
            </div>
          </Step>
          <Step activeClassName={COMPLETED_CLASS_NAME} completedClassName={COMPLETED_CLASS_NAME}>
            <UserIcon className={ICON_CLASS} />
            <div className="absolute -bottom-[4rem] w-max text-center">
              <Typography variant="h6">Step 3</Typography>
              <Typography className="font-light">Your Profile</Typography>
            </div>
          </Step>
          <Step activeClassName={COMPLETED_CLASS_NAME} completedClassName={COMPLETED_CLASS_NAME}>
            <Cog6ToothIcon className={ICON_CLASS} />
            <div className="absolute -bottom-[4rem] w-max text-center">
              <Typography variant="h6">Step 4</Typography>
              <Typography className="font-light">Preferences</Typography>
            </div>
          </Step>
          <Step activeClassName={COMPLETED_CLASS_NAME} completedClassName={COMPLETED_CLASS_NAME}>
            <DocumentCheckIcon className={ICON_CLASS} />
            <div className="absolute -bottom-[4rem] w-max text-center">
              <Typography variant="h6">Step 5</Typography>
              <Typography className="font-light">Review and Submit</Typography>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  )
}

export default RegistrationStep
