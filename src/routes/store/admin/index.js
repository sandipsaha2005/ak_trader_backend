import express from 'express'
import { isAdmin } from '../../../middlewares/auth.js';
import { createStore, modifyStore, deleteStore, getStore } from '../../../controllers/store/index.js';
const router = express.Router()



// Store management
router.post('/create-store', isAdmin, createStore);
router.post('/modify-store', isAdmin, modifyStore);
router.post('/delete-store', isAdmin, deleteStore);


// Store viewing
router.get('get-store', getStore)


export default router;