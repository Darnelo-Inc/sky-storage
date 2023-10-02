const fs = require("fs")
const path = require("path")

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
          return resolve({ message: "Dir was successfully created" })
        } else {
          return reject({ message: "Dir has already exists" })
        }
      } catch (error) {
        return reject(error)
      }
    })
  }
}

module.exports = new FileService()
