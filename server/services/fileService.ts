import fs from "fs"
import Path from "path"
import File, { IFile } from "../models/File"
import {
  ICreateObjDir,
  IDeleteFile,
  IDownloadFile,
  IFindFileByIdAndUserId,
  IGetFiles,
  IUploadFile,
} from "../models/FileService"
import User from "../models/User"

class FileService {
  getPath(file: IFile) {
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
        `../../files/${file.user_id}/${file.path}`
      )

      if (!fs.existsSync(filePath)) {
        console.log(1)
        console.log('filePath:', filePath)
        const res = fs.mkdirSync(filePath)
        console.log('res:', res)
        return { message: "Dir was successfully created" }
      } else {
        console.log(2)
        return { message: "Dir has already exists" }
      }
    } catch (error) {
      console.error(error)
      throw error
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
    console.log('parentDir:', parentDir)
    if (parentDir) {
      file.path = `${parentDir.path}/${file.name}`
      console.log('file.path1:', file.path)
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
 
    const parentDir = await this.findFileByIdAndUserId({
      user_id,
      _id: parent_id,
    })

    const type = file.name.split(".").at(-1)!.toLowerCase()

    file.name = file_name

    let absFilePath

    if (parentDir) {
      absFilePath = Path.join(
        __dirname,
        `../../files/${user._id}/${parentDir.path}/${file.name}`
      )
    } else {
      absFilePath = Path.join(__dirname, `../../files/${user._id}/${file.name}`)
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

    user.files.push(dbFile._id)

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

  async deleteFile({file, user_id}: IDeleteFile) {
    const targetPath = this.getPath(file)
    
    const user = await User.findById(user_id)

    if (!user) {
      return { error: "Something went wrong" }
    }

    if (file.type === "dir") {
      const dirStack = [file]

      while(dirStack.length) {
        const dir = dirStack.pop() as IFile

        for(const child of dir.children) {
          const obj = await File.findById(child)

          if(obj) {
            if(obj.type === "dir") {
              dirStack.push(obj)
            } else {
              const targetPath = this.getPath(obj)
              fs.unlinkSync(targetPath)
            }
          }
        }
      }

      fs.rmdirSync(targetPath)
    } else {
      user.files = user.files.filter(id => id !== file._id)

      const parentDir = await File.findById(file.parent_id)
      if (parentDir) {
        parentDir.children = parentDir.children.filter(id => id !== file._id)
      }

      while (parentDir) {
          parentDir.size -= file.size
          file = parentDir
      }

      fs.unlinkSync(targetPath)
    }
  }
}

export default new FileService()
