import fs from "fs"
import Path from "path"
import File, { IFile } from "../models/File"
import {
  ICreateObjDir,
  IDownloadFile,
  IFindFileByIdAndUserId,
  IGetFiles,
  IUploadFile,
} from "../models/FileService"
import User from "../models/User"

class FileService {
  // TODO: why file and dir have the same method called getFILE??
  getFile(file: IFile) {
    return Path.resolve(
      __dirname,
      `../files/${file.user_id}/${file.path}/${
        file.type === "dir" ? "" : file.name
      }`
    )
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

  async findFileByIdAndUserId({ _id, user_id }: IFindFileByIdAndUserId) {
    return await File.findOne({
      _id,
      user_id,
    })
  }

  async createDir(file: IFile) {
    try {
      const filePath = Path.join(
        __dirname,
        `../files/${file.user_id}/${file.path}`
      )

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

    const parentDir = await File.findById(parent_id)

    if (parentDir) {
      file.path = `${parentDir.path}/${file.name}`

      await this.createDir(file)

      parentDir.children.push(file._id)
      parentDir.size += file.size
      await parentDir.save()
    } else {
      file.path = file.name
      await this.createDir(file)
    }

    await file.save()

    return { file }
  }

  async uploadFile({ file, user_id, parent_id, file_name }: IUploadFile) {
    if (!file) {
      return { error: "No file uploaded" }
    }

    const user = await User.findById(user_id)

    if (!user) {
      return { error: "Something went wrong" }
    }

    if (user.used_space + file.size > user.disk_space) {
      return { error: "Not enough disk space" }
    }

    user.used_space += file.size
    // TODO: add file to user.files array

    const parentDir = await this.findFileByIdAndUserId({
      user_id,
      _id: parent_id,
    })

    const type = file.name.split(".").at(-1)!.toLowerCase()

    const lastDotIndex = file_name.lastIndexOf(".")

    if (lastDotIndex !== -1) {
      file_name = file_name.substring(0, lastDotIndex)
    }

    file.name = file_name

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

    const filePath = parentDir ? parentDir.path : "/"

    const dbFile = new File({
      name: file.name,
      type,
      size: file.size,
      path: filePath,
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

  deleteFile(file: IFile) {
    const targetPath = this.getFile(file)

    if (file.type === "dir") {
      // TODO: delete inner files
      fs.rmdirSync(targetPath)
    } else {
      // TODO: update parentDir info
      fs.unlinkSync(targetPath)
    }
  }
}

export default new FileService()
