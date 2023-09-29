import TableHeaderCell from '../Parts/TableHeaderCell'
import { TableHeaderProps } from '../types'

const SimpleTableHeader = ({ columns, sticky }: TableHeaderProps) => {
  const headerColDisplay = columns.map((col) => (
    <TableHeaderCell
      key={col.key}
      className={`bg-zembl-s1 text-zembl-p ${col.headerClassName ?? ''} ${sticky ? 'sticky top-0' : ''}`}
    >
      {col.label}
    </TableHeaderCell>
  ))
  return (
    <thead>
      <tr>{headerColDisplay}</tr>
    </thead>
  )
}

export default SimpleTableHeader
