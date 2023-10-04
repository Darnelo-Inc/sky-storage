const fs = require("fs")
const path = require("path")
const File = require("../models/File")
const User = require("../models/User")
const fileService = require("../services/fileService")

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent_id } = req.body
      const file = new File({
        name,
        type,
        parent_id,
        user_id: req.user.id,
        creation_date: Date.now(),
      })

      const parentFile = await File.findOne({ _id: parent_id })

      if (parentFile) {
        file.path = `${parentFile.path}/${file.name}`
        await fileService.createDir(file)

        parentFile.children.push(file._id)
        await parentFile.save()
      } else {
        file.path = name
        await fileService.createDir(file)
      }
      await file.save()

      return res.json(file)
    } catch (error) {
      res.status(400).json(error)
    }
  }

  async getFiles(req, res) {
    try {
      const files = await File.find({
        user_id: req.user.id,
        parent_id: req.query.parent_id,
      })
      return res.json(files)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Can't get files" })
    }
  }

  async uploadFile(req, res) {
    try {
      const file = req.files.file

      const parent = await File.findOne({
        user_id: req.user.id,
        _id: req.body.parent,
      })

      const user = await User.findOne({ _id: req.user.id })

      if (user.used_space + file.size > user.disk_space) {
        res.status(400).json({ message: "Not enough disk space" })
      }

      user.used_space += file.size

      let filePath

      if (parent) {
        filePath = path.join(
          __dirname,
          `../files/${user._id}/${parent.path}/${file.name}`
        )
      } else {
        filePath = path.join(__dirname, `../files/${user._id}/${file.name}`)
      }

      if (fs.existsSync(filePath)) {
        return res.status(400).json({ message: "File already exists" })
      }

      file.mv(filePath)

      const type = file.name.split(".").at(-1)

      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: parent?.path,
        parent_id: parent?._id,
        user_id: user._id,
        creation_date: Date.now(),
      })

      await dbFile.save()
      await user.save()

      res.json(dbFile)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Can't upload file" })
    }
  }
}

module.exports = new FileController()
