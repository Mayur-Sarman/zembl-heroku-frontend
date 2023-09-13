import TableBody from './SimpleTableBody'
import TableHeader from './SimpleTableHeader'
import { TableProps } from '../types'

const SimpleTable = ({ containerClassName, className, data, columns, stickyHeader }: TableProps) => {
  return (
    <div className={`overflow-auto ${containerClassName ?? ''}`}>
      <table className={`table w-full min-w-max table-auto text-left ${className ?? ''}`}>
        <TableHeader columns={columns} sticky={stickyHeader} />
        <TableBody columns={columns} data={data} />
      </table>
    </div>
  )
}

export default SimpleTable
