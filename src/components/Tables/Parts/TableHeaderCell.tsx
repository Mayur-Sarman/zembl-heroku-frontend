import { TableCellProps } from '../types'

const TableHeaderCell = ({ className, children }: TableCellProps) => {
  return (
    <th className={`text-zembl-p py-5 px-8 border border-zembl-p text-sm md:text-base font-normal ${className ?? ''}`}>
      {children}
    </th>
  )
}

export default TableHeaderCell
