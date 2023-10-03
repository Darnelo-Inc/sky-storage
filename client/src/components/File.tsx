import { FC } from "react"
import { useAppSelector } from "../hooks/redux"
import { useActions } from "../hooks/useActions"
import { FileProps } from "../models/file"
import { selectCurrentDir } from "../store/selectors/fileSelector"
import { dateCalc } from "../utils/dateCalc"
import { ICONS } from "../utils/iconCalc"
import { sizeCalc } from "../utils/sizeCalc"

const File: FC<FileProps> = ({ file }) => {
  const currentDir = useAppSelector(selectCurrentDir)

  const { setCurrentDir, pushDirStack } = useActions()

  const openDirHandler = () => {
    currentDir && pushDirStack(currentDir)
    setCurrentDir(file._id)
  }

  return (
    <div
      className="file"
      onClick={file.type === "dir" ? () => openDirHandler() : () => {}}
    >
      <div className="file__name">
        <img
          src={ICONS[file.type]}
          alt={file.name}
          className={["file__icon", `file__icon--${file.type}`].join(" ")}
        />
        {file.name}
      </div>
      <div className="file__spacing" />
      <div className="file__type">{file.type !== "dir" && file.type}</div>
      <div className="file__date">{dateCalc(file.creation_date)}</div>
      <div className="file__size">{sizeCalc(file.size)}</div>
    </div>
  )
}

export default File
