import express from 'express';
import auth from '../../middleware/auth.middleware';
import productsController from '../../controllers/products.controller';




const router = express.Router();
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/', auth, productsController.saveProduct);
router.put('/:id', auth, productsController.updateProduct);
router.delete('/:id', auth, productsController.deleteProductById);

export default router;