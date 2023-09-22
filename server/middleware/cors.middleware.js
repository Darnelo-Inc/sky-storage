function cors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
}

module.exports = cors
