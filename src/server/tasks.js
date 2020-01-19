import idealista from 'interfaces/idealista'
import habitaclia from 'interfaces/habitaclia'
import fotocasa from 'interfaces/fotocasa'
import Task from 'models/Task.model'
import Department from 'models/Department.model'


const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const toMilliseconds = (seconds) => seconds * 1000

const isDayTime = () => {
    const hours = new Date().getHours()
    if (hours > 5 && hours < 23) {
        return true
    }
    return false
}

const tasks = async () => {
    const cicle = async () => {
        // Promise.all([idealista(), habitaclia(), fotocasa()]) // Puede ser?
        if (isDayTime) {
            await idealista()
            console.log('i done')
            await habitaclia()
            console.log('h done')
            await fotocasa()
            console.log('f done')
        }
        const oneHour = toMilliseconds(3600)
        const timing = random(oneHour, oneHour * 1.5)
        const newTask = new Task({
            programmed: new Date(timing + Date.now()).toString()
        })
        await newTask.save()
        console.log(`New task scheduled @ ${newTask.programmed}`)
        setTimeout(cicle, timing);
    }
    await cicle()
}

export default tasks