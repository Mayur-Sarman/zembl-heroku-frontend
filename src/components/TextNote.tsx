import { ReactNode } from 'react'

const TextNote = ({ className, children }: TextNoteProps) => {
  return <div className={`bg-zembl-s1 p-4 rounded-md border ${className}`}>{children}</div>
}

interface TextNoteProps {
  className?: string
  children: ReactNode
}

export default TextNote
