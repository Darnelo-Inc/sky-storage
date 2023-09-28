import { FC, useEffect } from "react"
import { useAppSelector } from "../hooks/redux"
import { selectCurrentDir, selectFiles } from "../store/selectors/fileSelector"
import { useLazyGetFilesQuery } from "../api/filesApi"
import File from "../components/File"

const Storage: FC = () => {
  const currentDir = useAppSelector(selectCurrentDir)
  const files = useAppSelector(selectFiles)
  const [getFiles] = useLazyGetFilesQuery()

  useEffect(() => {
    getFiles(currentDir)
  }, [currentDir])

  return (
    <main className="storage">
      <div className="container">
        <div className="storage__inner">Content</div>
      </div>
    </main>
  )
}

export default Storage
