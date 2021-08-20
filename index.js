const express = require('express');
const Joi = require('joi');
const config = require('config');

const logger = require('./middlewares/logger');
const { Course } = require('./models/course');
const genreRoutes = require('./routes/genres');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

console.log(config.get('jwtPrivateKey'));
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL Error: JWT private key is not defined');
    process.exit(1); // 0 means success, any non-zero value means failure
}

app.use(logger);
app.use(express.static('public'));

console.log(`Environemnt: ${process.env.NODE_ENV}`); //value  for Node_ENV has to be set manaually
console.log(app.get('env'));   // this returns value of NODE_ENV, if not set returns 'development' 

//Custom Middleware
app.use(function (req, res, next) {
    console.log('listening...');
    next();
});``


// Defining routes
app.use('/api/genres/', genreRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/auth/', authRoutes);

const courses = [
    { id: 1, courseName: 'Course 1' },
    { id: 2, courseName: 'Course 2' },
    { id: 3, courseName: 'Course 3' }
]
app.get('/', (req, res) => {
    res.send('Hello World')
    // res.render('index', { title: 'My FIrst Node App', message: 'Hello' })
})

//route with param
// app.get('/api/courses/:year/:month', (req, res) => {
//     res.send(req.params);
// })

var arr = [1, 2, 3, 5, 6, 7, 8, 9, 10];

// or use Promises (instead of callbacks)
function getUser(x) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(x);
        }, 2000);

    })

}



const p = new Promise((resolve, reject) => {
    // Kick off a Async work
    // ..
    resolve(1);  //Pending  => resolve, reject
    // reject(err);
})

//consuming above promise
p.then((data) => {

}).catch((err) => {

})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server started: ${port}`);
});

// Working with MongoDB and Mongoose

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected with MongoDB');
});


async function getAllCourses() {
    const courses = await Course.find();
    console.log(courses);
}
getAllCourses();