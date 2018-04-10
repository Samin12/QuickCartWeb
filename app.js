require('./db');

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




app.set('port', (process.env.PORT || 17536));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
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
