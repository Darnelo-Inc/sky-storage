import "dotenv/config"
import express, { Express } from "express"
import fileUpload from "express-fileupload"
import fs from "fs"
import { createServer } from "https"
import mongoose from "mongoose"
import corsMiddleware from "./middleware/cors.middleware"
import authRouter from "./routes/auth.routes"
import fileRouter from "./routes/file.routes"

const app: Express = express()

const PORT = process.env.serverPort!
const dbURL = process.env.dbURL!
const isProd = process.env.NODE_ENV === "production"

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

async function start() {
  try {
    await mongoose.connect(dbURL, { dbName: "data" })

    if (isProd) {
      const options = {
        cert: fs.readFileSync("/etc/nginx/sslInfo/cert.pem"),
        key: fs.readFileSync("/etc/nginx/sslInfo/key.pem"),
      }

      const server = createServer(options, app)
      server.listen(PORT, () => {
        console.log("Server is running on HTTPS port " + PORT)
      })
    } else {
      app.listen(PORT, () => {
        console.log("Server is running on HTTP port " + PORT)
      })
    }
  } catch (error) {
    console.log(error)
  }
}

start()
