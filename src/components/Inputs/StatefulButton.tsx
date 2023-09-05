import { Button, ButtonProps } from '@material-tailwind/react'
import { ForwardedRef, forwardRef } from 'react'

const StatefulButton = forwardRef(function StatefulButton(
  props: StatefulButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const className = `w-full ${props.className} ${
    props.checked ? 'bg-zembl-action-primary' : 'active:bg-zembl-action-primary'
  }`
  return <Button {...props} ref={ref} variant="outlined" className={className} onClick={props.onChange} />
})

interface StatefulButtonProps extends ButtonProps {
  checked: boolean
}

export default StatefulButton
