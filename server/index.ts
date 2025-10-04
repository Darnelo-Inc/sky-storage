import "dotenv/config"
import express, { Express } from "express"
import fileUpload from "express-fileupload"
import fs from "fs"
import { createServer } from "https"
import mongoose from "mongoose"
import corsMiddleware from "./middleware/cors.middleware"
import authRouter from "./routes/auth.routes"
import fileRouter from "./routes/file.routes"
import { __isProd__, SERVER_PORT } from "./const"

const app: Express = express()



app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017', { dbName: "data" })

    if (__isProd__) {
      const options = {
        cert: fs.readFileSync("/etc/nginx/sslInfo/cert.pem"),
        key: fs.readFileSync("/etc/nginx/sslInfo/key.pem"),
      }

      const server = createServer(options, app)
      server.listen(SERVER_PORT, () => {
        console.log("Server is running on HTTPS port " + SERVER_PORT)
      })
    } else {
      app.listen(SERVER_PORT, () => {
        console.log("Server is running on HTTP port " + SERVER_PORT)
      })
    }
  } catch (error) {
    console.log(error)
  }
}

start()
