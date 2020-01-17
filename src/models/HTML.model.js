import mongoose from 'mongoose'

const HTML = new mongoose.Schema({
    content: String,
    origin: String,
})

export default mongoose.model('HTML', HTML)