import idealista from 'interfaces/idealista'
import habitaclia from 'interfaces/habitaclia'
import fotocasa from 'interfaces/fotocasa'

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const tasks = async () => {
    // const cicle = () => {
    //     const timing = random(432000, 216000)
    //     console.log(timing)
    //     setTimeout(cicle, timing);
    // }
    // cicle()
    // await idealista()
    await habitaclia()
    console.log('AFTER SCRIPT')
    // await fotocasa()
}

export default tasks