import { FC, MouseEvent, useState } from "react"
import Button from "./ui/Button"
import { useCreateDirMutation } from "../api/filesApi"

const StorageHeader: FC = () => {
  const [createBtnisActive, setCreateBtnisActive] = useState<boolean>(false)
  const [newDir, setNewDir] = useState<string>("")

  const [createDir] = useCreateDirMutation()

  const toggleCreateDir = () => {
    setCreateBtnisActive((prevState) => !prevState)
    setNewDir("")
  }

  const createDirHandler = () => {
    createDir({ name: newDir })
    toggleCreateDir()
  }

  const stopProp = (e: MouseEvent<HTMLFormElement>) => {
    e.stopPropagation()
  }

  return (
    <header className="storage__header">
      <h2>header</h2>
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
    </header>
  )
}

export default StorageHeader
