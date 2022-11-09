import { HTTP_STATUS } from "../constants/api.constants";
import { ProductsDAO } from "../model/daos/daos.app";
import { successResponse } from "../utils/api.utils";


const productsDao:any = new ProductsDAO();

class ProductsController {
    async getProducts(req: any, res: any, next: any) {
        try {
            const products = await productsDao.getAll();
            console.log('Get Products');
            
            const response = successResponse(products);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async getProductById(req: any, res: any, next: any) {
        const { id } = req.params;
        try {
            console.log(id);
            const product = await productsDao.getById(+id)
            if (!product) {
                return res.status(404).json({ error: `Product with id: ${id} does not exist!` });
            }
            res.json(product);
        }
        catch (error) {
            next(error);
        }
    }
    async saveProduct(req: any, res: any, next: any) {
        try {
            const newProduct = await productsDao.save(req.body)
            console.log(newProduct);
            const response = successResponse(newProduct)
            res.status(HTTP_STATUS.CREATED).json(response)
        }
        catch (error) {
            next(error);
        }
    }
    async updateProduct(req: any, res: any, next: any) {
        const { id } = req.params
        try {
            const updatedProduct = await productsDao.update(id, req.body)
            const response = successResponse(updatedProduct)
            res.json(response)
        }
        catch (error) {
            next(error);
        }
    }
    async deleteProductById(req: any, res: any, next: any) {
        const { id } = req.params
        try {
            const deletedProduct = await productsDao.delete(id)
            const response = successResponse(deletedProduct)
            res.json(response)
        }
        catch (error) {
                next(error);
            }
        }
    }

export default new ProductsController;