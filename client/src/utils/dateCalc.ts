export const dateCalc = (ms: number) => {
  const date = new Date(ms)

  const yyyy: number = date.getFullYear()
  let mm: number | string = date.getMonth() + 1
  let dd: number | string = date.getDate()
  if (dd < 10) dd = "0" + dd
  if (mm < 10) mm = "0" + mm

  return dd + "/" + mm + "/" + yyyy
}
