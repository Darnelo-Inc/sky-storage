const { Router } = require("express")
const fileController = require("../controllers/fileController")
const authMiddleware = require("../middleware/auth.middleware")

const router = new Router()

router.get("", authMiddleware, fileController.getFiles)
router.get("/download", authMiddleware, fileController.downloadFile)

router.post("", authMiddleware, fileController.createDir)
router.post("/upload", authMiddleware, fileController.uploadFile)

module.exports = router
