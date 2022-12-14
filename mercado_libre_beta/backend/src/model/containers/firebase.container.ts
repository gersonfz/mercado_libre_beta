import admin from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import db_config from '../../db/db.config'
import { HTTP_STATUS } from '../../constants/api.constants'
import { HttpError } from '../../utils/api.utils'


admin.initializeApp({
    credential: admin.credential.cert(db_config.firebase.credetentials)
})

class FirebaseContainer {
    collection:any

    constructor(collection:any) {
        const db = getFirestore()
        this.collection = db.collection(collection)
    }

    static async connect() { 

    }

    async getAll() {
        const docRef:any = await this.collection.get()
        const documents:any = docRef.docs
        return documents.map((doc:any) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
    }

    async getById(id:any) {
        const docRef = await this.collection.doc(id)
        const doc = await docRef.get()
        if (!doc.exists) {
            const message = `Resource with id ${id} does not exists`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return {
            id: doc.id,
            ...doc.data()
        }
    }

    async save(item:any = { timestamp: new Date().toLocaleString(), products: [] }) {
        const docRef:any = this.collection.doc()
        return await docRef.set(item)
    }

    async update(id:any, item:any) {
        const docRef = await this.collection.doc(id)
        const doc = await docRef.get()
        if (!doc.exists) {
            const message = `Resource with id ${id} does not exists`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return await docRef.update(item)
    }

    async delete(id:any) {
        const docRef = await this.collection.doc(id)
        const doc = await docRef.get()
        if (!doc.exists) {
            const message = `Resource with id ${id} does not exists`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return await docRef.delete()
    }
}

export default FirebaseContainer