import mongoose from 'mongoose'

const Department = new mongoose.Schema({
    link: String,
    image: String,
    price: String,
    title: String,
    reference: String,
    contact: String,
    description: String,
}, { timestamps: true })

export default mongoose.model('Department', Department)