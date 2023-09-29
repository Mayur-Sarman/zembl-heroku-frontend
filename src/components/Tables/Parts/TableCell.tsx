import { TableCellProps } from '../types'

const TableCell = ({ className, children }: TableCellProps) => {
  return (
    <td className={`text-zembl-p py-5 px-6 border border-zembl-p max-w-xs text-sm md:text-base ${className ?? ''}`}>
      {children}
    </td>
  )
}

export default TableCell
