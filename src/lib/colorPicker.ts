export const COLOR_GREEN = [0, 255, 0]
export const COLOR_WHITE = [255, 255, 255]
export const COLOR_RED = [255, 0, 0]

export const pickColor = (
  weight: number,
  color_bad: number[] = COLOR_RED,
  color_good: number[] = COLOR_GREEN,
  color_intermediate: number[] = COLOR_WHITE
): string => {
  let color1 = color_intermediate
  let color2 = color_bad
  let w1 = weight * 2
  let w2 = 1 - w1

  if (weight > 0.5) {
    color2 = color_intermediate
    color1 = color_good
    w1 = (weight - 0.5) * 2
    w2 = 1 - w1
  }

  const rgb = [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2),
  ]

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

export const calculateWeight = (value: number, min: number, max: number) => {
  const weight = Math.max(0, Math.min((value - min) / (max - min), 1))

  return weight
}

export const calculateWeightReverse = (
  value: number,
  min: number,
  max: number
) => {
  const weight = Math.max(0, 1 - Math.min((value - min) / (max - min), 1))

  return weight
}
