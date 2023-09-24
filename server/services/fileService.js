const fs = require("fs")
const path = require("path")
const File = require("../models/File")

class FileService {
  createDir(file) {
    const filePath = path.join(
      __dirname,
      `../files/${file.user_id}/${file.path}`
    )

    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({ message: "File was successfully created" })
        } else {
          return reject({ message: "File has already exists" })
        }
      } catch (error) {
        return reject({ message: "Something went wrong" })
      }
    })
  }
}

module.exports = new FileService()
