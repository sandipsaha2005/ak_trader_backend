import express from 'express'
import { login, register, me } from '../../../controllers/auth/admin/index.js'
// import { isAdmin } from '../../../middlewares/auth.js'
import {isAdmin} from '../../../middlewares/auth.js'
import { createItem } from '../../../controllers/product-management/stock-creation/index.js'
const router = express.Router()

// auth
router.post('/login-admin',login)
router.post('/register-admin', register)
router.get('/me-admin',isAdmin, me)




export default router;