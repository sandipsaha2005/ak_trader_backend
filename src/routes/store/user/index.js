import express from 'express'
import { isAdmin } from '../../../middlewares/auth.js';
import {getStore } from '../../../controllers/store/index.js';
const router = express.Router()





// Store viewing
router.get('/get-store', getStore)


export default router;