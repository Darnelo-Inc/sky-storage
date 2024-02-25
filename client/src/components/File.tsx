import { FC, MouseEvent } from "react"
import { useLazyDownloadFileQuery } from "../api/filesApi"
import { useAppSelector } from "../hooks/redux"
import { useActions } from "../hooks/useActions"
import { selectCurrentDir } from "../store/selectors/fileSelector"
import { dateCalc } from "../utils/dateCalc"
import { ICONS } from "../utils/iconCalc"
import { sizeCalc } from "../utils/sizeCalc"
import { IFile } from "../models/file"

interface FileProps {
  file: IFile
}

const File: FC<FileProps> = (props) => {
  const { file } = props

  const currentDir = useAppSelector(selectCurrentDir)

  const { setCurrentDir, pushDirStack } = useActions()
  const [downloadFile] = useLazyDownloadFileQuery()

  const openDirHandler = () => {
    currentDir && pushDirStack(currentDir)
    setCurrentDir(file._id)
  }

  const downloadHandler = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const res = await downloadFile({ id: file._id })

    const downloadURL = res.data || ""
    const link = document.createElement("a")
    link.href = downloadURL
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const lastDotIndex = file.name.lastIndexOf(".")
  let file_name = file.name

  if (lastDotIndex !== -1) {
    file_name = file.name.substring(0, lastDotIndex)
  }

  
  return (
    <div
      className="file"
      // TODO: animation of the transition between folders (?react-transition-group?)
      onClick={
        file.type === "dir" ? () => openDirHandler() : (e) => downloadHandler(e)
      }
    >
      {/* TODO: add "radio-mark" to delete or download a group of files */}
      <div className="file__name">
        <img
          src={ICONS[file.type]}
          alt={file.name}
          className={["file__icon", `file__icon--${file.type}`].join(" ")}
        />
        {file_name}
      </div>
      <div className="file__spacing" />
      <div className="file__type">{file.type !== "dir" && file.type}</div>
      <div className="file__date">{dateCalc(file.creation_date)}</div>
      <div className="file__size">{sizeCalc(file.size)}</div>
    </div>
  )
}

export default File
