import express from 'express'
import { login, register, me } from '../../../controllers/auth/user/index.js'
import { isAuthorized } from '../../../middlewares/auth.js'
// ----------------------------------------------------------------------

const router = express.Router()

router.post('/login',login)
router.post('/register', register)
router.get('/me',isAuthorized, me)

export default router;