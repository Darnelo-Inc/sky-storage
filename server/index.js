require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const corsMiddleware = require("./middleware/cors.middleware")
const authRouter = require("../server/routes/auth.routes")
const fileRouter = require("../server/routes/file.routes")

const app = express()
const PORT = process.env.serverPort
const dbURL = process.env.dbURL

app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

async function start() {
  try {
    await mongoose.connect(dbURL)

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
