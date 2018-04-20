require('./db');
require('./messenger');

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



// new User({
//     name: "Samin",
//     phoneNumber: "3477612839"
// }).save(function (err,review,count) {
//     //res.redirect('/');
// });
// 
// 
// console.log("catt");
// User.find({},function (err,varToStoreResult,count) {
// 
// 
//     console.log("Data");
//     console.log(varToStoreResult);
// });



app.get('/', (req, res) => {
    res.render('index');
});



app.post('/', (req, res) => {

    console.log(req.body.name);
    console.log(req.body.phoneNumber);
    console.log(req.body.cartName);

    new User({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
}).save(function (err,review,count) {
    //res.redirect('/');
        User.find({},function (err,varToStoreResult,count) {
            console.log(varToStoreResult);
        });
});

    if (req.body.cartName === "Halal Guys"){
        res.render('cart1');
    }




});

app.get('/cart', (req, res) => {
    res.render('cart1');
});

app.post('/cart', (req, res) => {
    res.render('cart1');
});

app.post('/exit', (req, res) => {
    res.render('exit');
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
