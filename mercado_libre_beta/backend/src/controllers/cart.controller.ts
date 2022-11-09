

import { HTTP_STATUS } from '../constants/api.constants'
import { successResponse } from '../utils/api.utils'
import { CartsDAO } from '../model/daos/daos.app'

const cartsDAO:any = new CartsDAO()

class CartsController {
    async createCart(req:any, res:any, next:any) {
        try {
            const newCart = await cartsDAO.save()
            const response = successResponse(newCart)
            res.status(HTTP_STATUS.CREATED).json(response)
        } catch (err) {
            next(err)
        }
    }

    async deleteCart(req:any, res:any, next:any) {
        const { id } = req.params
        try {
            const deletedCart = await cartsDAO.delete(id)
            const response = successResponse(deletedCart)
            res.json(response)
        } catch (err) {
            next(err)
        }
    }

    async getProducts(req:any, res:any, next:any) {
        const { id } = req.params
        try {
            const products = await cartsDAO.getProducts(id)
            const response = successResponse(products)
            res.json(response)
        } catch (err) {
            next(err)
        }
    }

    async saveProduct(req:any, res:any, next:any) {
        const { cartId, prodId } = req.params
        try {
            const newProduct = await cartsDAO.saveProduct(cartId, prodId)
            const response = successResponse(newProduct)
            res.status(HTTP_STATUS.CREATED).json(response)
        } catch (err) {
            next(err)
        }
    }

    async deleteProduct(req:any, res:any, next:any) {
        const { cartId, prodId } = req.params
        try {
            const deletedProduct = await cartsDAO.deleteProduct(cartId, prodId)
            const response = successResponse(deletedProduct)
            res.json(response)
        } catch (err) {
            next(err)
        }
    }
}

export default new CartsController()