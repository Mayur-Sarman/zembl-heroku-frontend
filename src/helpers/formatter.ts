interface DecimalOptions {
  maxDecimal: number
  minDecimal: number
}

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
