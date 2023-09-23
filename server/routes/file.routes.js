const { Router } = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const fileController = require("../controllers/fileController")

const router = new Router()

router.post("", authMiddleware, fileController.createDir)

module.exports = router
