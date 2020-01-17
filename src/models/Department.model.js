import mongoose from 'mongoose'

const Department = new mongoose.Schema({
    link: String,
    image: String,
    price: String,
    title: String,
    reference: String,
    contact: String,
    date: { type: Date, default: Date.now },
})

export default mongoose.model('Department', Department)