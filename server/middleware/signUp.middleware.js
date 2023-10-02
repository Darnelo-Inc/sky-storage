const { check, validationResult } = require("express-validator")

const signUpMiddleware = [
  check("email", "Incorrect email").isEmail(),
  check("password", "Password must be longer than 6 symbols").isLength({
    min: 6,
  }),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    next()
  },
]

module.exports = signUpMiddleware
