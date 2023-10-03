import { FC, useEffect } from "react"
import { useLazyGetFilesQuery } from "../api/filesApi"
import File from "../components/File"
import StorageHeader from "../components/StorageHeader"
import { useAppSelector } from "../hooks/redux"
import { selectCurrentDir, selectFiles } from "../store/selectors/fileSelector"

const Storage: FC = () => {
  const currentDir = useAppSelector(selectCurrentDir)
  const files = useAppSelector(selectFiles)

  const [getFiles] = useLazyGetFilesQuery()

  useEffect(() => {
    getFiles(currentDir)
  }, [getFiles, currentDir])

  return (
    <main className="storage">
      <div className="container">
        <div className="storage__inner">
          <StorageHeader />
          <main className="storage__main">
            <aside className="storage__aside">
              <h2>aside</h2>
            </aside>
            <div className="storage__content">
              {files.map((file) => (
                <File key={file._id} file={file} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </main>
  )
}

export default Storage
