import { DocumentIcon } from '@heroicons/react/20/solid'
import { Chip, ChipProps } from '@material-tailwind/react'
import { onClose } from '@material-tailwind/react/types/components/chip'

const AttachmentBadge = ({ file, fileName, onClose, ...rest }: AttachmentBadgeProps) => {
  const _fileName = file?.name ?? fileName ?? null
  // const _fileSize = file?.size ?? fileSize ?? null
  // const _fileType = file?.type ?? fileType ?? null

  const fileIcon = <DocumentIcon />

  return <Chip open={true} onClose={onClose} icon={fileIcon} value={_fileName} size="lg"  {...rest} />
}

interface AttachmentBadgeProps extends Partial<ChipProps> {
  file?: File
  fileName?: string
  fileType?: string
  fileSize?: string
  onClose?: onClose
}

export default AttachmentBadge
