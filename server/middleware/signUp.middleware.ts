import { NextFunction, Request, Response } from "express"
import { check, validationResult } from "express-validator"

const signUpMiddleware = [
  check("email", "Incorrect email").isEmail(),
  check("password", "Password must be longer than 6 symbols").isLength({
    min: 6,
  }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    next()
  },
]

export default signUpMiddleware
