import express from 'express'
import {isAdmin} from '../../../middlewares/auth.js'
import { createItem , modifyItem , deleteItem} from '../../../controllers/product-management/stock-creation/index.js'
const router = express.Router()



//product management
router.post('/create-product', isAdmin,createItem);
router.post('/modify-product', isAdmin, modifyItem);
router.post('/delete-product', isAdmin, deleteItem);


export default router;