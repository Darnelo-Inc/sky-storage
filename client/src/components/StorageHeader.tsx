import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react"
import Button from "./ui/Button"
import { useCreateDirMutation, useUploadFileMutation } from "../api/filesApi"
import { useAppSelector } from "../hooks/redux"
import { useActions } from "../hooks/useActions"
import {
  selectCurrentDir,
  selectDirStack,
} from "../store/selectors/fileSelector"

const StorageHeader: FC = () => {
  const [createBtnisActive, setCreateBtnisActive] = useState<boolean>(false)
  const [newDir, setNewDir] = useState<string>("")
  const createDirInputRef = useRef<HTMLInputElement | null>(null)
  const createDirRef = useRef<HTMLInputElement | null>(null)

  const { popDirStack, setCurrentDir } = useActions()

  const currentDir = useAppSelector(selectCurrentDir)
  const dirStack = useAppSelector(selectDirStack)

  const [createDir] = useCreateDirMutation()
  const [uploadFile] = useUploadFileMutation()

  const backHandler = () => {
    const popped = dirStack.at(-1)
    setCurrentDir(popped ? popped : null)
    popDirStack()
  }

  const toggleCreateDir = () => {
    setCreateBtnisActive((prevState) => !prevState)
    if (createDirInputRef.current) createDirInputRef.current.focus()
    setNewDir("")
  }

  const createDirHandler = (e: FormEvent<HTMLFormElement>) => {
    rmDefault(e)
    createDir({ name: newDir, parent_id: currentDir })
    toggleCreateDir()
  }

  const rmDefault = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const uploadFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || new FileList()

    for (let i = 0; i < files.length; i++) {
      uploadFile({ file: files.item(i), parent_id: currentDir })
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (
      createBtnisActive &&
      createDirRef.current &&
      !createDirRef.current.contains(e.target as Node)
    ) {
      toggleCreateDir()
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createBtnisActive])

  return (
    <header className="storage__header">
      <div className="storage__btns">
        <Button
          type="button"
          className={"btn  btn--back"}
          onClick={() => backHandler()}
        >
          Back
        </Button>

        <form action="">
          <label htmlFor="uploadFile" className="btn  btn--upload">
            Upload file
          </label>
          <input
            onChange={(e) => uploadFileHandler(e)}
            multiple
            type="file"
            id="uploadFile"
            className="storage__upload"
          />
        </form>

        <div className="storage__header__createDir" ref={createDirRef}>
          <Button
            type="button"
            className={[
              "btn",
              "btn--create",
              createBtnisActive ? "btn--create--active" : "",
            ].join(" ")}
            onClick={() => toggleCreateDir()}
          >
            {createBtnisActive ? "Cancel" : "Create dir"}
          </Button>

          <form
            className={[
              "form--createDir",
              createBtnisActive ? "" : "form--hidden",
            ].join(" ")}
            onSubmit={(e) => createDirHandler(e)}
          >
            <input
              className={[
                "input",
                "input--createDir",
                createBtnisActive ? "" : "input--hidden",
              ].join(" ")}
              value={newDir}
              onChange={(e) => setNewDir(e.target.value)}
              id="createDir"
              placeholder="Name new dir"
              ref={createDirInputRef}
            />
            <Button
              type="button"
              className="btn--createDir"
              onClick={(e) => createDirHandler(e)}
            >
              ✔
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}

export default StorageHeader
