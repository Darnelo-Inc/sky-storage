import { FC } from "react"
import { FileProps } from "../models/file"

const File: FC<FileProps> = ({ file }) => {
  return <div>FileName: {file.name}</div>
}

export default File
