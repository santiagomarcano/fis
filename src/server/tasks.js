import idealista from 'interfaces/idealista'
import habitaclia from 'interfaces/habitaclia'
import fotocasa from 'interfaces/fotocasa'
import Task from 'models/Task.model'

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const toMilliseconds = (seconds) => seconds * 1000

const tasks = async () => {
    const cicle = async () => {
        const oneHour = toMilliseconds(3600)
        const timing = random(oneHour, oneHour * 1.5)
        const newTask = new Task({
            programmed: new Date(timing + Date.now()).toString()
        })
        await newTask.save()
        setTimeout(cicle, timing);
    }
    // cicle()
    // await idealista()
    // await habitaclia()
    console.log('DONE')
    // await fotocasa()
}

export default tasks