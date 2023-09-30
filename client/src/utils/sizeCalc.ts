export const sizeCalc = (size: number): string => {
  if (size === 0) return "0 B"

  const sizes = ["B", "Kb", "Mb", "Gb", "Tb"]

  const i = Math.floor(Math.log(size) / Math.log(1024))

  return `${(size / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}
