const fileService = require("../services/fileService")
const File = require("../models/File")
const User = require("../models/User")

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent_id } = req.body
      const file = new File({
        name,
        type,
        parent_id,
        user_id: req.user.id,
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

  async fetchFiles(req, res) {
    try {
      const files = await File.find({
        user_id: req.user.id,
        parent_id: req.query.parent_id,
      })
      return res.json({ files })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Can't get files" })
    }
  }
}

module.exports = new FileController()
