import "dotenv/config"
import { Request, Response } from "express"
import File from "../models/File"
import authService from "../services/authService"
import fileService from "../services/fileService"

class AuthController {
  async signUp(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const result = await authService.signUp({ email, password })

      if (result.error) {
        return res.status(409).json({ message: result.error })
      }

      fileService.createDir(new File({ user_id: result.user!.id, name: "" }))

      return res.json(result)
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", details: error })
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const result = await authService.signIn({ email, password })

      if (result.error) {
        return res.status(401).json({ message: result.error })
      }

      return res.json(result)
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", details: error })
    }
  }

  async auth(req: Request, res: Response) {
    try {
      const result = await authService.auth(req.user?.id)

      if (result.error) {
        return res.status(401).json({ message: result.error })
      }

      return res.json(result)
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", details: error })
    }
  }
}

export default new AuthController()
