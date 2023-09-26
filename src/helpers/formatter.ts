import { DateTime } from 'luxon'
import { DATA_TYPE_CURRENCY, DATA_TYPE_DATE, DATA_TYPE_NUMBER, DATA_TYPE_PERCENT, DATA_TYPE_TEXT } from '../constants'
import { isDate, toNumber } from 'lodash'
import { ReactNode } from 'react'

export const formatCurrency = (
  number: number | null | undefined,
  options: DecimalOptions = { maxDecimal: 0, minDecimal: 0 },
): string =>
  number
    ? new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        maximumFractionDigits: options.maxDecimal,
        minimumFractionDigits: options.minDecimal,
      }).format(number)
    : 'N/A'

export const formatPercent = (
  number: number | null | undefined,
  options: DecimalOptions = { maxDecimal: 0, minDecimal: 0 },
): string => {
  return number
    ? new Intl.NumberFormat('en-AU', {
        style: 'percent',
        currency: 'AUD',
        maximumFractionDigits: options.maxDecimal,
        minimumFractionDigits: options.minDecimal,
      }).format(number)
    : 'N/A'
}

export const formatDateTime = (value: string | Date, preferredFormat = 'dd MM yyyy') => {
  const dateValue = new Date(value)
  const luxonDate = DateTime.fromJSDate(dateValue)
  if (!luxonDate.isValid) return 'N/A'

  return luxonDate.toFormat(preferredFormat)
}

export const getJSONDateString = (value: string | Date, preferredFormat = 'yyyy-MM-dd') => {
  const dateValue = new Date(value)
  const luxonDate = DateTime.fromJSDate(dateValue)
  if (!luxonDate.isValid) return null

  return luxonDate.toFormat(preferredFormat)
}

export const formatData: FormatDataFunction = (value, dataType, formatOptions) => {
  let formattedValue = null

  if (isDate(formattedValue)) dataType = DATA_TYPE_DATE

  switch (dataType) {
    case DATA_TYPE_NUMBER:
      formattedValue = toNumber(value).toFixed(2)
      break
    case DATA_TYPE_DATE:
      formattedValue = formatDateTime(value as string | Date, formatOptions?.dateFormat)
      break
    case DATA_TYPE_CURRENCY:
      formattedValue = formatCurrency(value as number, formatOptions?.numberFormatOptions)
      break
    case DATA_TYPE_PERCENT:
      formattedValue = formatPercent(value as number, formatOptions?.numberFormatOptions)
      break
    case DATA_TYPE_TEXT:
    default:
      formattedValue = value as string
      break
  }

  return formattedValue
}

export type FormatDataFunction = (
  value: unknown,
  dataType: string,
  transformOptions?: TransformOptions,
) => string | ReactNode

export interface TransformOptions {
  dateFormat?: string
  numberFormatOptions?: DecimalOptions
}

export interface DecimalOptions {
  maxDecimal: number
  minDecimal: number
}
