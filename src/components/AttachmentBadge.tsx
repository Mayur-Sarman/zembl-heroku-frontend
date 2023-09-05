import { DocumentIcon } from '@heroicons/react/20/solid'
import { Button } from '@material-tailwind/react'
import { MouseEventHandler } from 'react'

// TODO: IMPLEMENT THIS
const AttachmentBadge = ({ file, fileType, fileSize, fileName, onClick }: AttachmentBadgeProps) => {
  const _fileName = file?.name ?? fileName ?? null
  const _fileSize = file?.size ?? fileSize ?? null
  const _fileType = file?.type ?? fileType ?? null

  console.log(_fileType)
  console.log(_fileSize)

  const fileIcon = <DocumentIcon />

  return (
    <Button onClick={onClick} className="flex gap-2 px-6 py-4">
      {fileIcon}
      {_fileName}
    </Button>
  )
}

interface AttachmentBadgeProps {
  file?: File
  fileName?: string
  fileType?: string
  fileSize?: string
  onClick?: MouseEventHandler
}

export default AttachmentBadge
