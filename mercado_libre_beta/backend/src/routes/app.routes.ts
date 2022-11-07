import express from 'express';
import ProductsRoutes from './products/products.routes';
import CartRoutes from './cart/cart.routes';

const router = express.Router();
router.use('/products', ProductsRoutes);
router.use('/cart', CartRoutes);

export default router;