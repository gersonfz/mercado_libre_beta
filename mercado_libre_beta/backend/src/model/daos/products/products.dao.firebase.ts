import { HTTP_STATUS } from '../../../constants/api.constants'
import { HttpError } from '../../../utils/api.utils'
import FirebaseContainer from '../../containers/firebase.container'
import { Product } from '../../../utils/types.utils'


const collection:string = 'products'

class ProductsFirebaseDAO extends FirebaseContainer {
    constructor() {
        super(collection)
    }

    async save(product: Product) {
        const { title, description, code, thumbnail, price, stock } = product;

        if (!title || !description || !code || !thumbnail || !price || !stock) {
            const message = 'Wrong body format: missing fields'
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
        }

        const docRef:any = this.collection.doc()
        return await docRef.set({
            timestamp: new Date().toLocaleString(),
            ...product
        })
    }

    async update(id:string, product:Product) {        
        const { title, description, code, thumbnail, price, stock } = product

        if (!title || !description || !code || !thumbnail || !price || !stock) {
            const message = 'Wrong body format: missing fields'
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
        }


        const docRef = this.collection.doc(id)
        const doc = await docRef.get()
        if (!doc.exists) {
            const message = `Resource with id ${id} does not exists`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return await docRef.update(product)
    }
}

export default ProductsFirebaseDAO