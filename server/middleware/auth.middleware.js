const jwt = require("jsonwebtoken")
const config = require("config")

const secretKey = config.secretKey

function auth(req, res, next) {
  if (req.method === "OPTIONS") {
    return next()
  }

  try {
    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const decoded = jwt.verify(token, secretKey)
    req.user = decoded

    next()
  } catch (error) {
    return res.status(400).json({ message: "Bad Request" })
  }
}

module.exports = auth
