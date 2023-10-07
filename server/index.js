require("dotenv").config()
const https = require("https")
const express = require("express")
const fileUpload = require("express-fileupload")
const mongoose = require("mongoose")
const corsMiddleware = require("./middleware/cors.middleware")
const authRouter = require("../server/routes/auth.routes")
const fileRouter = require("../server/routes/file.routes")

const options = {
  cert: fs.readFileSync("/etc/nginx/sslInfo/cert.pem"),
  key: fs.readFileSync("/etc/nginx/sslInfo/key.pem"),
}

const app = express()
const PORT = process.env.serverPort
const dbURL = process.env.dbURL

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

const server = https.createServer(options, app)

async function start() {
  try {
    await mongoose.connect(dbURL)

    server.listen(443, () => {
      console.log("Server is running on port 443")
    })
  } catch (error) {
    console.log(error)
  }
}

start()
