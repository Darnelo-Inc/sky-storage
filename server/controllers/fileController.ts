import { Response, Request } from "express"
import { UploadedFile } from "express-fileupload"
import fs from "fs"
import { ObjectId } from "mongoose"
import Path from "path"
import File from "../models/File"
import fileService from "../services/fileService"

class FileController {
  async createDir(req: Request, res: Response) {
    try {
      const { name, parent_id } = req.body

      const result = await fileService.createObjDir({
        name,
        user_id: req.user?.id,
        parent_id,
      })

      if (result.error) {
        return res.status(404).json({ message: result.error })
      }

      return res.json(result.file)
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Unable to create directory", details: error })
    }
  }

  async getFiles(req: Request, res: Response) {
    try {
      const parent_id = req.query.parent_id as unknown as ObjectId

      const result = await fileService.getFiles({
        user_id: req.user?.id,
        parent_id,
      })

      if (result.error) {
        return res.status(404).json({ message: result.error })
      }

      return res.json(result.files)
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Unable to retrieve files", details: error })
    }
  }

  async uploadFile(req: Request, res: Response) {
    try {
      const file = req.files?.file as UploadedFile
      console.log(file)
      const result = await fileService.uploadFile({
        file,
        user_id: req.user?.id,
        parent_id: req.body.parent_id,
      })

      if (result.error) {
        return res.status(400).json({ message: result.error })
      }

      return res.json(result.dbFile)
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Unable to upload file", details: error })
    }
  }

  async downloadFile(req: Request, res: Response) {
    try {
      const _id = req.query.id as unknown as ObjectId
      const result = await fileService.downloadFile({
        _id,
        user_id: req.user?.id,
      })

      if (result.error) {
        return res.status(400).json({ message: result.error })
      }

      const file = result.file!

      const filePath = Path.join(
        __dirname,
        `../files/${req.user!.id}/${file.path}/${file.name}`
      )

      if (fs.existsSync(filePath)) {
        return res.download(filePath, file.name)
      } else {
        return res.status(400).json({ message: "File not exists" })
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Unable to download file", details: error })
    }
  }

  async deleteFile(req: Request, res: Response) {
    try {
      const file = await File.findOne({
        _id: req.query.id,
        user_id: req.user?.id,
      })

      if (!file) {
        return res.status(400).json({ message: "Something went wrong" })
      }

      fileService.deleteFile(file)

      await File.deleteOne({ _id: req.query.id })

      return res.json({ message: "File was successfully deleted" })
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Unable to delete file", details: error })
    }
  }
}

export default new FileController()
