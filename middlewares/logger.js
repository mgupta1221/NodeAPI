
function logger(req, res, next) {
    console.log('logging...');   // req.body
    next();
}

module.exports= logger;

// const EventEmitter = require('events');

// class Logger extends EventEmitter {
//     log(param) {
//         console.log(param);
//         // Notice we are calling EventEmitter
//         // class's emit function using 'this'
//         this.emit('LogMessage', { id: 1, name: 'Mohit' });
//     }
// }

// module.exports = Logger;

