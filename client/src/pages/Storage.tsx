import { FC, useEffect } from "react"
import { useAppSelector } from "../hooks/redux"
import { selectCurrentDir, selectFiles } from "../store/selectors/fileSelector"
import { useLazyGetFilesQuery } from "../api/filesApi"
import File from "../components/File"

const Storage: FC = () => {
  const currentDir = useAppSelector(selectCurrentDir)
  const files = useAppSelector(selectFiles)
  const [getFiles] = useLazyGetFilesQuery()

  console.log(files)

  useEffect(() => {
    getFiles(currentDir)
  }, [currentDir])

  return (
    <div className="container text-center">
      <h1>Storage</h1>
      {files.length
        ? files.map((file) => <File key={file._id} file={file} />)
        : "No files"}
    </div>
  )
}

export default Storage
