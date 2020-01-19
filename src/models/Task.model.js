import mongoose from 'mongoose'

const Task = new mongoose.Schema({
    programmed: String 
}, { timestamps: true })

export default mongoose.model('Task', Task)