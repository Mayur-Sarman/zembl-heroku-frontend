import { TableProps } from '../types'
import HorizontalTableBody from './HorizontalTableBody'

const HorizontalTable = ({ containerClassName, className, data, columns, striped }: TableProps) => {
  return (
    <div className={`overflow-auto ${containerClassName ?? ''}`}>
      <table className={`table w-full min-w-max table-auto text-left ${className ?? ''}`}>
        <HorizontalTableBody data={data} columns={columns} striped={striped} />
      </table>
    </div>
  )
}

export default HorizontalTable
