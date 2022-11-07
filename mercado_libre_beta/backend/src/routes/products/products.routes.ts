import express from 'express';
import path from 'path';
import ProductsConstructor from '../../model/containers/ProductsConstructor'
import auth from '../../middleware/auth.middleware';


const router = express.Router();

const productsRoute = new ProductsConstructor(path.resolve(__dirname, '../../../data/product.json'))

router.get('/', async (req, res) => {
    res.send(await productsRoute.getAll())
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const product = await productsRoute.getById(+id)
    if (!product) {
        return res.status(404).json({error: `Product with id: ${id} does not exist!`});
    }
    res.json(product);
})

router.post('/', auth, async(req, res) => {
    const { title, price, thumbnail, description, code, stock } = req.body;
    console.log(req.body);
    if ( !title || !price || !thumbnail || !description || !code || !stock ) {
        return res.status(400).json({ succes: false, error: 'Wrong body format' });
    } 
    let allProduct = await productsRoute.getAll()
    const newProduct = {
        title,
        price: +(price),
        thumbnail,
        description,
        code: +(code),
        stock: +(stock),
        timestamp: new Date().toLocaleString(),
        id: allProduct.length + 1
    };
    await productsRoute.save(newProduct);
    return res.redirect("/");
});

router.put('/:id', auth, async (req, res) => {
    const { params: { id }, body: { title, price, thumbnail} } = req;
    if ( !title || !price || !thumbnail) {
        return res.status(400).json({ success: false, error: 'Wrong body format' });
    };
    const productGetAll = await productsRoute.getAll()
    const productIndex = productGetAll.findIndex((product:any) => product.id === +id);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!`});
    const newProduct = {
        ...productGetAll[productIndex],
        title,
        price,
        thumbnail
    };

    productGetAll[productIndex] = newProduct;
    await productsRoute.fileSaving(productGetAll)
    return res.json({ success: true, result: newProduct});
});

router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const allProducts = await productsRoute.getAll()
    const productIndex = allProducts.findIndex((product:any) => product.id === +id);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id ${id} does not exist!`});
    console.log(productIndex);
    allProducts.splice(productIndex, 1);
    await productsRoute.deleteById(+id)
    return res.json({ success: true, result: 'product correctly eliminated' });
});

export default router;