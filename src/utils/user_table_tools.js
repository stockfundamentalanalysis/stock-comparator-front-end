export const formatNumberUSD = (number) => {
  // Use Intl.NumberFormat to format the number
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal', // Use 'scientific' for scientific notation
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short',
  })

  return formatter.format(number)
}
