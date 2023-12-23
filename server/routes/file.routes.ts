import { Router } from "express"
import fileController from "../controllers/fileController"
import authMiddleware from "../middleware/auth.middleware"
import deduplicateMiddleware from "../middleware/deduplication.middleware"

const router = Router()

router.get("", authMiddleware, fileController.getFiles)
router.get("/download", authMiddleware, fileController.downloadFile)

router.post("", authMiddleware, fileController.createDir)
router.post(
  "/upload",
  authMiddleware,
  deduplicateMiddleware,
  fileController.uploadFile
)
router.delete("/", authMiddleware, fileController.deleteFile)

export default router
