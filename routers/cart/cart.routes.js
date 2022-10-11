const express = require('express')
const path = require('path')
const CartConstructor = require('../../model/cartConstructor')
const ProductsConstructor = require('../../model/productsConstructor')
const router = express.Router();

const cartApi = new CartConstructor(path.resolve(__dirname, '../../data/cart.json'))
const productApi = new ProductsConstructor(path.resolve(__dirname, '../../data/product.json'))

router.post('/', async (req, res) => {
    try {
        let getProduct = await productApi.getAll()
        if (getProduct.length) {
            let allProductCart = await cartApi.getAll()
            const newProductCart = {
                id: allProductCart.length + 1,
                timestamp: new Date().toLocaleString(),
                products: getProduct
            };
            await cartApi.save(newProductCart);
            return res.json({ success: true, result: newProductCart })
        } else {
            return res.json({ success: false, error: 'Products empty' })
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'An error has ocurred creating a cart' })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteByIdResult = await cartApi.deleteById(id)
        if (deleteByIdResult === -1) {
            return res.status(404).json({
                success: false,
                error: `Cart with id ${id} does not exist`
            })
        } else {
            return res.json({
                success: true,
                result: `Cart with id ${id} deleted`
            })
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'An error has ocurred deleting the cart'
        })
    }
})
router.get('/:id/products', async (req, res) => {
    try {
        const { id } = req.params
        const getCartProductsResult = await cartApi.getCartProducts(id)
        if (getCartProductsResult === -1) {
            return res.status(404).json({
                success: false,
                error: `Cart with id ${id} does not exist`
            })
        } else {
            return res.json({
                success: true,
                result: getCartProductsResult
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'An error has ocurred getting the products from the cart'
        })
    }
})
router.post('/:cartId/products', async (req, res) => {
    try {
        const { cartId } = req.params;
        const { title, price, thumbnail, description, code, stock, timestamp, id } = req.body;
        if (!title || !price || !thumbnail || !description || !code || !stock || !timestamp || !id) {
            return res.status(400).json({ succes: false, error: 'Wrong body format' });
        }
        const newProduct = {
            title,
            price: +(price),
            thumbnail,
            description,
            code: +(code),
            stock: +(stock),
            timestamp,
            id: +(id)
        };
        const saveNewProduct = await cartApi.saveProduct(cartId, newProduct)
        console.log(saveNewProduct);
        if (saveNewProduct === -1) {
            return res.status(404).json({
                success: false,
                error: `Cart with id ${cartId} does not exist`
            })
        } else {
            return res.json({
                success: true,
                result: newProduct
            })
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'An error has ocurred saving the product in the cart'
        })
    }
})
router.delete('/:id/products/:id_prod', async (req, res) => {
    try {
        const { id: cartId, id_prod: prodId } = req.params
        const deleteProductResult = await cartApi.deleteProduct(cartId, prodId)
        if (deleteProductResult === -1) {
            return res.status(404).json({
                success: false,
                error: `Cart with id ${cartId} does not exist`
            })
        } else if (deleteProductResult === -2) {
            return res.status(404).json({
                success: false,
                error: `Product with id ${prodId} does not exist in cart with id ${cartId}`
            })
        } else {
            return res.json({
                success: true,
                result: `Product with id ${prodId} deleted from cart with id ${cartId}`
            })
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'An error has ocurred deleting the product from the cart'
        })
    }
})

module.exports = router;