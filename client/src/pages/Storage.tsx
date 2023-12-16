import { FC, useEffect, useState, DragEvent } from "react"
import { useLazyGetFilesQuery, useUploadFileMutation } from "../api/filesApi"
import File from "../components/File"
import StorageHeader from "../components/StorageHeader"
import { useAppSelector } from "../hooks/redux"
import { selectCurrentDir, selectFiles } from "../store/selectors/fileSelector"

const Storage: FC = () => {
  const currentDir = useAppSelector(selectCurrentDir)
  const files = useAppSelector(selectFiles)

  // TODO: uploading progress bar
  const [uploadFile] = useUploadFileMutation()
  const [getFiles] = useLazyGetFilesQuery()

  const [drag, setDrag] = useState<boolean>(false)

  const dragOverHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDrag(true)
  }

  const dragLeaveHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDrag(false)
  }

  const dropHandler = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDrag(false)

    const files = e.dataTransfer.files

    for (let i = 0; i < files.length; i++) {
      uploadFile({ file: files.item(i), parent_id: currentDir })
    }
  }

  useEffect(() => {
    getFiles(currentDir)
  }, [getFiles, currentDir])

  return (
    // TODO: isLoading animation
    // TODO: adaptive layout
    <main
      className="storage"
      onDrop={(e) => dropHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
    >
      <div className="container">
        <div className={`storage__inner ${drag ? "storage__inner--drag" : ""}`}>
          <StorageHeader />
          <main className="storage__main">
            <aside className="storage__aside">
              <h2>aside</h2>
            </aside>
            <div className="storage__content">
              {/* TODO: empty folder case */}
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
