import ENV_CONFIG_PROCESS from '../../config'
import ProductsMongoDAO from './products/products.dao.mongo'
import ProductsFirebaseDAO from './products/products.dao.firebase'
import CartsMongoDAO from './cart/cart.daos.mongo'
import CartsFirebaseDAO from './cart/cart.daos.firebase'

let ProductsDAO
let CartsDAO

switch (ENV_CONFIG_PROCESS.DATASOURCE) {
    case 'mongo':
        ProductsDAO = ProductsMongoDAO
        CartsDAO = CartsMongoDAO
        break

    case 'firebase':
        ProductsDAO = ProductsFirebaseDAO
        CartsDAO = CartsFirebaseDAO
        break

    default:
        throw new Error('Invalid Datasource')
}

export { ProductsDAO, CartsDAO }