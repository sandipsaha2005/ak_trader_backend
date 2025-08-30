import { Router } from 'express';
import adminAuthRoutes from '../routes/auth/admin/index.js';
import userAuthRoutes from '../routes/auth/user/index.js';
import productManagementRoutes from '../routes/product/admin/index.js'
import storeRoutes from '../routes/store/admin/index.js'
import userStoreRoutes from '../routes/store/user/index.js'

const router = Router();

router.use('/admin', adminAuthRoutes);
router.use('/admin', productManagementRoutes);
router.use('/user', userAuthRoutes);
router.use('/admin', storeRoutes)
router.use('/user', userStoreRoutes)


export default router;
