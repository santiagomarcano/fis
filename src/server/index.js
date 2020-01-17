import { config } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import tasks from './tasks'
config()
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {

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
db.once('open', err => {
    if (err) console.log(err)
    console.log(`Server started & DB connected. ${port}`)
    tasks()
})

export default server