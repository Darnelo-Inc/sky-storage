import { FC } from "react"
import { FileProps } from "../models/file"
import { sizeCalc } from "../utils/sizeCalc"
import { dateCalc } from "../utils/dateCalc"
import { ICONS } from "../utils/iconCalc"

const File: FC<FileProps> = ({ file }) => {
  return (
    <>
      <img src={ICONS[file.type]} alt={file.name} className="file__icon" />
      <div className="file__name">{file.name}</div>
      <div className="file__spacing" />
      <div className="file__type">{file.type !== "dir" && file.type}</div>
      <div className="file__date">{dateCalc(file.creation_date)}</div>
      <div className="file__size">{sizeCalc(file.size)}</div>
    </>
  )
}

export default File
