import { formatData } from '../../../helpers/formatter'
import TableCell from '../Parts/TableCell'
import TableHeaderCell from '../Parts/TableHeaderCell'
import { TableBodyProps } from '../types'

const HorizontalTableBody = ({ data, columns, striped }: TableBodyProps) => {
  const bodyDisplay = columns.map((col) => {
    const dataCells = data.map((data, index) => {
      const value = formatData(data[col.key], col.type, {
        dateFormat: col.dateFormat,
        numberFormatOptions: col.numberFormatOptions,
      })

      return <TableCell key={`${col.key}_${(data.id as string) ?? index}`}>{value}</TableCell>
    })

    return (
      <tr key={col.key} className={`${striped ? 'even:!bg-zembl-s1 odd:bg-white' : ''}`}>
        <TableHeaderCell className={col.headerClassName ?? ''}>{col.label}</TableHeaderCell>
        {dataCells}
      </tr>
    )
  })
  return <tbody>{bodyDisplay}</tbody>
}

export default HorizontalTableBody
