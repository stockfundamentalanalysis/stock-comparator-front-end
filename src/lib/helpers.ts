export function isNotNull<T>(item: T | null): item is T {
  return item !== null
}

export const formatNumberUSD = (number: number | bigint) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short',
  })

  return formatter.format(number)
}
