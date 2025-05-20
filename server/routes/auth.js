import express, { Router } from 'express'
import { login,register,verify} from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/verify',authMiddleware,verify)

export default router;