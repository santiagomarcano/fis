const notifier = require('node-notifier');
const path = require('path');

console.log('OK. Seras notificado en 45min')

setInterval(() => {
    notifier.notify(
        {
            title: 'Pomodoro',
            message: 'Ya sabes que hacer :D',
            icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait
        },
        function (err, response) {
            console.log('DONE')
            // Response is response from notification
        }
    )
}, 2700 * 1000)