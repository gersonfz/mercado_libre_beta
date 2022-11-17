import { Schema } from 'mongoose'

const cartSchema = new Schema({
    timestamp: { type: String, default: new Date().toLocaleString() },
    products: { type: Array, required: true, default: [] }
})

export default cartSchema