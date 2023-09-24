const Router = require("express")
const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const config = require("../config/default.json")
const authMiddleware = require("../middleware/auth.middleware")
const fileService = require("../services/fileService")
const File = require("../models/File")

const router = Router()
const secretKey = config.secretKey

router.post(
  "/signUp",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Password must be longer than 6 symbols").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      console.log(errors)

      if (errors.errors.length) {
        return res.status(422).json({ message: "Validation error", errors })
      }

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
)

router.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "Invalid username or password" })
    }

    const isPasswordValid = await bcryptjs.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(404).json({ message: "Invalid username or password" })
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" })

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
})

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id })
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" })

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
    console.log(error, "oops")
    res.send({ message: "500 Internal Server Error" })
  }
})

module.exports = router
