import { ReactNode } from 'react'
import { DecimalOptions } from '../../helpers/formatter'

export interface ColumnDefinition {
  key: string
  type: string
  label: string
  dateFormat?: string
  numberFormatOptions?: DecimalOptions
  headerClassName?: string
  bodyClassName?: string //'overflow-ellipsis overflow-hidden max-w-[25%]'
}

export interface TableProps {
  data: Record<string, unknown>[]
  columns: ColumnDefinition[]
  containerClassName?: string
  className?: string
  stickyHeader?: boolean
  striped?: boolean
}

export interface TableBodyProps {
  data: Record<string, unknown>[]
  columns: ColumnDefinition[]
  striped?: boolean
}

export interface TableHeaderProps {
  columns: ColumnDefinition[]
  sticky?: boolean
}

export interface TableCellProps {
  children: ReactNode
  className?: string
}
