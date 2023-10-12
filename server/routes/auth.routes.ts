import { Router } from "express"
import authController from "../controllers/authController"
import authMiddleware from "../middleware/auth.middleware"
import signUpMiddleware from "../middleware/signUp.middleware"

const router = Router()

router.get("/", authMiddleware, authController.auth)

router.post("/signIn", authController.signIn)
router.post("/signUp", signUpMiddleware, authController.signUp)

export default router
