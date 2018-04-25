require('./db');
const twilioServer = require('./messenger');

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let parseurl = require('parseurl');

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
const Item = mongoose.model('Item');

// User.findOne({username: "samin"}, function (err, user) {
//     // user.username = newUser.username;
//     // user.password = newUser.password;
//     // user.rights = newUser.rights;
//
//     user.save(function (err) {
//         if(err) {
//             console.error('ERROR!');
//         }
//     });
// });

//pushing items to users

// User.find({name: "man"},function (err,varToStoreResult,count) {
//
//     //
//     // console.log(typeof +" this")
//
//
//    varToStoreResult[0].order.push(
//         Item({
//             name: "Chicken Over Rice",
//             cartName: "Halal Guys",
//             price: 8.99
//         })
//
// );
//     console.log(varToStoreResult[0].order);
// });


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

class sessionOrder  {
    constructor(sessionID) {
        this.sessionID = sessionID;


        this.orders = [];
    }


    addOrder(name,price,cartName,times) {

            this.orders.push(
                Item({
                    name: name,
                    cartName: cartName,
                    price: price,
                    amount: times
                })

            );
    }

    get allOrders(){
        return this.orders
    }







}



app.get('/', (req, res) => {
    res.render('index');

    let seo = new sessionOrder(req.session.id);

    seo.addOrder( Item({
        name: "Chicken Over Rice",
        cartName: "Halal Guys",
        price: 8.99
    }));


  //  console.log(seo)

});



app.post('/', (req, res) => {

    // console.log(req.body.name);
    // console.log(req.body.phoneNumber);
    // console.log(req.body.cartName);



//     new User({
//     name: req.body.name,
//     phoneNumber: req.body.phoneNumber
// }).save(function (err,review,count) {
//     //res.redirect('/');
//         User.find({},function (err,varToStoreResult,count) {
//             //console.log(varToStoreResult);
//         });
// });


//use sessions to filter



    if (req.body.cartName === "Halal Guys"){
        res.redirect('/cart');
    }




});


///working here
app.get('/cart', (req, res) => {
    res.render('cart1');
});

app.post('/cart', (req, res) => {

    let sesOrder = new sessionOrder(req.session.id);

    if (req.body.item>0){
        sesOrder.addOrder(req.body.itemName,req.body.itemPrice,req.body.cartName,req.body.item);

    }

   if (req.body.item2>0){
       sesOrder.addOrder(req.body.item2Name,req.body.item2Price,req.body.cartName,req.body.item2);
   }


   // console.log("Session Orders");

   // console.log(sesOrder.allOrders);

    //console.log("Session Orders");



    let tot =0;

    let totFinder = sesOrder.allOrders.forEach( (a)=>{
        tot+=a.amount*a.price;
    });
    const sesUser = new User({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        sessionID: req.session.id,
        order: sesOrder.allOrders,
        total: tot
    }).save(function (err,review,count) {
        //res.redirect('/');


        User.findOne({sessionID: req.session.id},function (err,varToStoreResult) {
            sesOrder.allOrders.forEach(function(order){
               varToStoreResult.order.push(order);
            });

            //console.log(".lgasd");

           // console.log(varToStoreResult);

            //varToStoreResult.save();

        });

        // User.findOneAndUpdate({sessionID: req.session.id},function (err,user) {
        //     user.order.push(sesOrder.allOrders);
        //     console.log(user)
        // });

    });
    //
    // console.log("SesUser");
    //
    // console.log(sesUser)
    // console.log("SesUser");





    //console.log(tot+"This is the otal ");


    res.render('exit',{allOrders: sesOrder.allOrders,total:tot});




});


app.get('/exit', (req, res) => {
   // console.log(req.body.name)

    User.find({sessionID: req.session.id},function (err,varToStoreResult) {
        console.log("cat");


       // console.log(varToStoreResult);
    });

    res.render('exit');
});

app.post('/exit', (req, res) => {
    //console.log(req.body.name)

    User.find({sessionID: req.session.id},function (err,varToStoreResult) {
       // console.log("cat");


       // console.log(varToStoreResult);
    });


    res.render('exit');
});

app.post('/done', (req, res) => {

    console.log("done obj");
    User.find({sessionID: req.session.id},function (err,varToStoreResult) {
      //  console.log("Last msg");


       // console.log(varToStoreResult);
      //  console.log(varToStoreResult[0].total);

        let itemNameArray= [];


        varToStoreResult[0].order.forEach((x)=>{
            //console.log(x.name);
            // console.log("---");
            // console.log(x.name);
            // console.log("---");

            itemNameArray.push(x.amount+" "+x.name);
            itemNameArray.push(" and ");

        });




     let orderMsgText = "Your order total is "+varToStoreResult[0].total+ " for "+ itemNameArray.toString() +" will be ready in 10 minutes";

        // console.log("---");
         //console.log(orderMsgText);
        //
        // console.log("---");


        console.log(orderMsgText);
        // twilioServer.sendText("3477612839",orderMsgText)

    });



    //console.log(req.body.name)
    // have to get and retrun the string
   // twilioServer.sendText("3477612839","the string");
    res.render('done');
});



//changed this
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

//i hit add on a itme button and a table pops up under the post and each the the button is clicked the page refreshes and updatse the table

//