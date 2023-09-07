const Router = require("express")
const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const { check, validationResult } = require("express-validator")

const router = Router()

router.post(
  "/signup",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Password must be longer than 6 symbols").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty) {
        return res.status(422).json({ message: "Validation error", errors })
      }

      const { email, password } = req.body

      const isUserExist = await User.findOne({ email })

      if (isUserExist) {
        return res.status(409).json("User with this email already exists")
      }
      const hashedPassword = await bcryptjs.hash(password, 15)
      const newUser = new User({ email, password: hashedPassword })

      await newUser.save()
      return res.json({ message: "User was successfully created!" })
    } catch (error) {
      console.log(error)
      res.send({ message: "500 Internal Server Error" })
    }
  }
)

module.exports = router
