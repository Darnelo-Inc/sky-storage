import { FC, MouseEvent, useState } from "react"
import Button from "./ui/Button"
import { useCreateDirMutation } from "../api/filesApi"
import { useAppSelector } from "../hooks/redux"
import {
  selectCurrentDir,
  selectDirStack,
} from "../store/selectors/fileSelector"
import { useActions } from "../hooks/useActions"

const StorageHeader: FC = () => {
  const [createBtnisActive, setCreateBtnisActive] = useState<boolean>(false)
  const [newDir, setNewDir] = useState<string>("")

  const { popDirStack, setCurrentDir } = useActions()

  const currentDir = useAppSelector(selectCurrentDir)
  const dirStack = useAppSelector(selectDirStack)

  const [createDir] = useCreateDirMutation()

  const backHandler = () => {
    const popped = dirStack.at(-1)
    setCurrentDir(popped ? popped : null)
    popDirStack()
  }

  const toggleCreateDir = () => {
    setCreateBtnisActive((prevState) => !prevState)
    setNewDir("")
  }

  const createDirHandler = () => {
    createDir({ name: newDir, parent_id: currentDir })
    toggleCreateDir()
  }

  const stopProp = (e: MouseEvent<HTMLFormElement>) => {
    e.stopPropagation()
  }

  return (
    <header className="storage__header">
      <div className="storage__btns">
        <Button
          type={"button"}
          className={"btn  btn--back"}
          onClick={() => backHandler()}
        >
          Back
        </Button>

        <div className="storage__header__createDir">
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
            onClick={(e) => stopProp(e)}
          >
            <input
              className={[
                "input",
                "input--createDir",
                createBtnisActive ? "" : "input--hidden",
              ].join(" ")}
              value={newDir}
              onChange={(e) => setNewDir(e.target.value)}
              placeholder="Name new dir"
            />
            <Button
              type="button"
              className="btn--createDir"
              onClick={() => createDirHandler()}
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
