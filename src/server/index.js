import { config } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import tasks from './tasks'
import Department from 'models/Department.model'
import cors from 'cors'

config()
const app = express()
const port = process.env.PORT
app.use(cors())

app.get('/all', async (req, res) => {
    const recents = new Date(Date.now() - 3600000)
    const results = await Department.find({ updatedAt: { $gte: recents } })
    res.send(results)
})

const server = app.listen(port, () => {
    console.log('Starting...')
    mongoose.connect(process.env.MONGO_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    );
})

const db = mongoose.connection;

db.on('err', err => console.log(err))
db.once('open', async (err) => {
    if (err) console.log(err)
    console.log(`Server started & DB connected. ${port}`)
    await tasks()
})

export default server