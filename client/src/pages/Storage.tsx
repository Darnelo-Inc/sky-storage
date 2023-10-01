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
  }, [currentDir, getFiles])

  return (
    <main className="storage">
      <div className="container">
        <div className="storage__inner">
          <header className="storage__header">
            <h2>header</h2>
          </header>
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
