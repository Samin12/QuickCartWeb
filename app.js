require('./db');

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));




app.set('port', (process.env.PORT || 3000));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));


const User = mongoose.model('User');



new User({
    name: "Samin",
    phoneNumber: "3477612839"
}).save(function (err,review,count) {
    //res.redirect('/');
});


console.log("catt");
User.find({},function (err,varToStoreResult,count) {


    console.log("Data");
    console.log(varToStoreResult);
});



app.get('/', (req, res) => {
    res.render('index');
});


app.post('/', (req, res) => {

    console.log(req.body);
    res.render('index');
});

app.get('/cartNearby', (req, res) => {
    res.render('cartsNearby');
});

app.get('/cartSelect', (req, res) => {
    res.render('cartSelect');
});

app.get('/menu', (req, res) => {
    res.render('menu');
});

app.get('/placeOrder', (req, res) => {
    res.render('menu');
});


app.post('/placeOrder', (req, res) => {
    res.render('menu');
});


//changed this
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
