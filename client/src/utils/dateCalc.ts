export const dateCalc = (ms: number) => {
  const date = new Date(ms)

  const year: number = date.getFullYear()
  let month: number | string = date.getMonth() + 1
  let day: number | string = date.getDate()
  if (day < 10) day = "0" + day
  if (month < 10) month = "0" + month

  return day + "/" + month + "/" + year
}
