const Router = require("express")
const authController = require("../controllers/authController")
const authMiddleware = require("../middleware/auth.middleware")
const signUpMiddleware = require("../middleware/signUp.middleware")

const router = Router()

router.get("/", authMiddleware, authController.auth)

router.post("/signUp", signUpMiddleware, authController.signUp)
router.post("/signIn", authController.signIn)

module.exports = router
