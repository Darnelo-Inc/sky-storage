const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("../server/routes/auth.routes")
const fileRouter = require("../server/routes/file.routes")
const corsMiddleware = require("./middleware/cors.middleware")

const app = express()
const PORT = config.get("serverPort")
const dbURL = config.get("dbURL")

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
