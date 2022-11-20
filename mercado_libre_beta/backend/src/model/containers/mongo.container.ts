import mongoose, { Schema } from 'mongoose'
import db_config from '../../db/db.config'
import { HttpError } from '../../utils/api.utils'
import { HTTP_STATUS } from '../../constants/api.constants'

class MongoContainer {
    model

    constructor(collection: string, schema: Schema) {
        this.model = mongoose.model(collection, schema)
    }

    static async connect() {
        await mongoose.connect(db_config.mongodb.URI)
        
    }

    static async disconnect() {
        await mongoose.disconnect()
    }

    async getAll(filter = {}) {
        const documents = await this.model.find(filter, { __v: 0 }).lean()
        return documents
    }

    async getById(id: any) {
        const document = await this.model.findOne({ _id: id }, { __v: 0 })
        if (!document) {
            const message = `Resource with id ${id} not found`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return document
    }

    async save(item:any = {}) {
        const newDocument = new this.model(item)
        return await newDocument.save()
    }

    async update(id: any, item: any) {
        const updatedDocument = await this.model.updateOne(
            { _id: id },
            { $set: { ...item } }
        )
        if (!updatedDocument.matchedCount) {
            const message = `Resource with id ${id} does not exists`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return updatedDocument
    }

    async delete(id:any) {
        const deletedDocument = await this.model.deleteOne({ _id: id })
        if (!deletedDocument.deletedCount) {
            const message = `Resource with id ${id} does not exists`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return deletedDocument
    }
}

export default MongoContainer