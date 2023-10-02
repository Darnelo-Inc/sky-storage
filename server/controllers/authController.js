const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const File = require("../models/File")
const User = require("../models/User")
const fileService = require("../services/fileService")

class AuthController {
  async signUp(req, res) {
    try {
      const { email, password } = req.body

      const isUserExist = await User.findOne({ email })
      if (isUserExist) {
        return res.status(409).json("User with this email already exists")
      }

      const hashedPassword = await bcryptjs.hash(password, 5)

      const user = new User({ email, password: hashedPassword })
      await user.save()

      await fileService.createDir(new File({ user_id: user.id, name: "" }))

      return res.json({ message: "User was successfully created!" })
    } catch (error) {
      console.log(error)
      res.send({ message: "500 Internal Server Error" })
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ message: "Invalid username or password" })
      }

      const isPasswordValid = await bcryptjs.compareSync(
        password,
        user.password
      )
      if (!isPasswordValid) {
        return res.status(404).json({ message: "Invalid username or password" })
      }

      const token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: "1h",
      })

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          disk_space: user.disk_space,
          used_space: user.used_space,
          avatar: user.avatar,
        },
      })
    } catch (error) {
      console.log(error)
      res.send({ message: "500 Internal Server Error" })
    }
  }

  async auth(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id })
      const token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: "1h",
      })

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          disk_space: user.disk_space,
          used_space: user.used_space,
          avatar: user.avatar,
        },
      })
    } catch (error) {
      res.send({ message: "500 Internal Server Error" })
    }
  }
}

module.exports = new AuthController()
