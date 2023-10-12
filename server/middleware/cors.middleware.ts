import { NextFunction, Request, Response } from "express"

function corsMiddleware(_req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
}

export default corsMiddleware
