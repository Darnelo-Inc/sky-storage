import { JwtPayload } from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
      name?: string
      type?: string
      parent_id?: string
    }
  }
}
