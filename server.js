const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1', // same thing as local host
        user: 'marcussauceda',
        password: '',
        database: 'face-recognition'
    }
});

// console.log(postgres.select('*').from('users'));

// db.select('*').from('users').then(data => {
//     console.log(data);
// })

const app = express();



// middleware ###\###/###*###\###/###*###\###/###*###\###/###*###\###/###*
app.use(bodyParser.json());
app.use(cors());




// routes ###\###/###*###\###/###*###\###/###*###\###/###*###\###/###*
app.get('/', (req, res) => {res.send('hello from root')})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})



// bcrypt code ###\###/###*###\###/###*###\###/###*###\###/###*###\###/###*
// bcrypt.hash("bacon", null, null, function(err, hash) {
    // store hash in your password DB 
// });

// Load hash from your password DB
// bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
// });

// bcrypt.compare("veggies", hash, function(err, res) {
    // rs = false
// })



// app listen
app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});


// notes ###\###/###*###\###/###*###\###/###*###\###/###*###\###/###*
/*
/ --> res = root is working
/signin -> POST  = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user / count(rank)

bcrypt-nodejs <-- deprecated
can use bcrypt or bcrypt.js



*/