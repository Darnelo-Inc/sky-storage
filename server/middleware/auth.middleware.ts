import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import { JwtPayload, Secret, verify } from "jsonwebtoken"

const secretKey = process.env.secretKey as Secret

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    const decoded = verify(token, secretKey) as JwtPayload
    req.user = decoded

    next()
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", details: error })
  }
}

export default authMiddleware
