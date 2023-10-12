import fs from "fs"
import Path from "path"
import authService from "./authService"
import { I_id } from "../models/AuthService"
import File, { IFile } from "../models/File"
import {
  ICreateObjDir,
  IDownloadFile,
  IFileInfo,
  IFindFileByIdAndUserId,
  IGetFiles,
  IUpdateParentInfo,
  IUploadFile,
} from "../models/FileService"

class FileService {
  getFile(file: IFile) {
    return Path.resolve(__dirname, `../files/${file.user_id}/${file.path}`)
  }

  async getFiles({ user_id, parent_id }: IGetFiles) {
    const files = await File.find({
      user_id,
      parent_id,
    })

    if (!files) {
      return { error: "Files not found" }
    }

    return { files }
  }

  async findFileById({ _id }: I_id) {
    return await File.findOne({ _id })
  }

  async findFileByIdAndUserId({ _id, user_id }: IFindFileByIdAndUserId) {
    return await File.findOne({
      _id,
      user_id,
    })
  }

  async createDir({ user_id, file_path = "" }: IFileInfo) {
    try {
      const filePath = Path.join(__dirname, `../files/${user_id}/${file_path}`)
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath)
        return { message: "Dir was successfully created" }
      } else {
        return { message: "Dir has already exists" }
      }
    } catch (error) {
      return { error }
    }
  }

  createRootDir({ user_id: id }: IFileInfo) {
    this.createDir({ user_id: id })
  }

  async createObjDir({ name, user_id, parent_id }: ICreateObjDir) {
    const file = new File({
      name,
      parent_id,
      user_id,
      type: "dir",
      creation_date: Date.now(),
    })

    if (!file) {
      return { error: "User not found" }
    }

    this.updateParentInfo({ file, parent_id })

    await file.save()

    return { file }
  }

  async updateParentInfo({ file, parent_id }: IUpdateParentInfo) {
    const parentDir = await this.findFileById({ _id: parent_id })

    if (parentDir) {
      file.path = `${parentDir.path}/${file.name}`
      await this.createDir({
        user_id: file.user_id,
        file_path: file.path,
      })

      parentDir.children.push(file._id)
      parentDir.size += file.size
      await parentDir.save()
    } else {
      file.path = file.name
      await this.createDir({
        user_id: file.user_id,
        file_path: file.path,
      })
    }
  }

  deleteFile(file: IFile) {
    const targetPath = this.getFile(file)

    if (file.type === "dir") {
      // delete inner files
      fs.rmdirSync(targetPath)
    } else {
      // update parentDir info
      fs.unlinkSync(targetPath)
    }
  }

  async uploadFile({ file, user_id, parent_id }: IUploadFile) {
    if (!file) {
      return { error: "No file uploaded" }
    }
    const user = await authService.findUserById({ _id: user_id })

    if (!user) {
      return { error: "Something went wrong" }
    }

    if (user.used_space + file.size > user.disk_space) {
      return { error: "Not enough disk space" }
    }

    user.used_space += file.size

    const parentDir = await this.findFileByIdAndUserId({
      user_id,
      _id: parent_id,
    })

    let absFilePath

    if (parentDir) {
      absFilePath = Path.join(
        __dirname,
        `../files/${user._id}/${parentDir.path}/${file.name}`
      )
    } else {
      absFilePath = Path.join(__dirname, `../files/${user._id}/${file.name}`)
    }

    if (fs.existsSync(absFilePath)) {
      return { error: "File already exists" }
    }

    file.mv(absFilePath)

    const type = file.name.split(".").at(-1)!

    // const filePath = parentDir ? parentDir.path : "/"

    const dbFile = new File({
      name: file.name,
      type,
      size: file.size,
      path: parentDir?.path,
      parent_id: parentDir?._id,
      user_id: user._id,
      creation_date: Date.now(),
    })

    await dbFile.save()

    await user.save()

    return { dbFile }
  }

  async downloadFile({ _id, user_id }: IDownloadFile) {
    const file = await this.findFileByIdAndUserId({
      _id,
      user_id,
    })

    if (!file) {
      return { error: "File not found" }
    }

    return { file }
  }
}

export default new FileService()
