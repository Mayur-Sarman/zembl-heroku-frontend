import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

const BACK_CLASS = 'text-zembl-p w-full lg:w-1/3 place-self-center'
const NEXT_CLASS = '!zembl-btn w-full lg:w-1/3 place-self-center'

const PageNavigationActions = ({
  nextLabel = 'Next',
  nextClass,
  nextLink,
  nextDisabled = false,
  hideNext = false,
  prevLabel = 'Back',
  prevClass,
  prevLink,
  prevExternal,
  hidePrev = false,
  containerClass,
}: PageNavigationActionsProps) => {
  const navigate = useNavigate()

  return (
    <div className={`flex flex-col lg:flex-row gap-6 justify-center ${containerClass ?? ''}`}>
      <Button
        variant="outlined"
        onClick={() => (prevExternal && prevLink ? (window.location.href = prevLink) : navigate(prevLink ?? '#'))}
        className={`${BACK_CLASS} ${hidePrev ? 'hidden' : ''} ${prevClass ?? ''}`}
      >
        {prevLabel}
      </Button>
      <Button
        type={nextLink ? 'button' : 'submit'}
        disabled={nextDisabled}
        onClick={nextLink ? () => navigate(nextLink) : undefined}
        className={`${NEXT_CLASS} ${hideNext ? 'hidden' : ''} ${nextClass ?? ''}`}
      >
        {nextLabel}
      </Button>
    </div>
  )
}

interface PageNavigationActionsProps {
  nextLabel?: string
  nextClass?: string
  hideNext?: boolean
  nextLink?: string
  prevLabel?: string
  prevLink?: string
  prevClass?: string
  hidePrev?: boolean
  containerClass?: string
  nextDisabled?: boolean
  prevExternal?: boolean
}

export default PageNavigationActions
