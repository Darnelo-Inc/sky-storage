import { Request, Response, NextFunction } from "express"
import crypto from "crypto"

const storage: { hash: string; data: any }[] = []

function deduplicateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = req.body

  const hash = crypto
    .createHash("md5")
    .update(JSON.stringify(data))
    .digest("hex")

  const existingData = storage.find((item) => item.hash === hash)

  if (existingData) {
    return res.status(409).json({ error: "Data already exists" })
  }

  storage.push({ hash, data })

  next()
}

export default deduplicateMiddleware
