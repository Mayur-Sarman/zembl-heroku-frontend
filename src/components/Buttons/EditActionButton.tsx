import { CheckCircleIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { Typography } from '@material-tailwind/react'
import { MouseEventHandler } from 'react'

const ICON_CLASS_NAME = 'w-4 h-4'

const EditActionButton = ({ onEditClickHandler, isEditing }: EditActionButtonProps) => {
  return (
    <div
      tabIndex={0}
      onKeyDown={undefined}
      role="button"
      onClick={onEditClickHandler}
      className="flex items-center gap-2 bg-transparent border-transparent shadow-none text-zembl-p pointer-events-auto"
    >
      {isEditing ? <CheckCircleIcon className={ICON_CLASS_NAME} /> : <PencilSquareIcon className={ICON_CLASS_NAME} />}
      <Typography className="text-sm">{isEditing ? 'Save' : 'Edit'}</Typography>
    </div>
  )
}

interface EditActionButtonProps {
  onEditClickHandler: MouseEventHandler<HTMLDivElement>
  isEditing: boolean
}

export default EditActionButton
