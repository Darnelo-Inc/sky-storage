const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("../server/routes/auth.routes")
const bodyParser = require("body-parser")

const app = express()
const PORT = config.get("serverPort")
const dbURL = config.get("dbURL")

app.use(express.json())
app.use("/api/auth", authRouter)

const start = async () => {
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
