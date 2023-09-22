const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("../server/routes/auth.routes")

const app = express()
const PORT = config.get("serverPort")
const dbURL = config.get("dbURL")
const corsMiddleware = require("./middleware/cors.middleware")

app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)

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

// app.get("/", (req, res) => {
//   res.send("Hello World!")
// })

start()
