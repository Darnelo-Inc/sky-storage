const express = require("express")
const mongoose = require("mongoose")
const config = require("config")

const app = express()
const PORT = config.get("serverPort")
const dbURL = config.get("dbURL")

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
