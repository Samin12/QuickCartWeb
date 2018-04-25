// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// users



// an item (or group of the same items) in a grocery list
// * includes the quantity of this item (multiple of the same item does not 
//   require additional Item documents; just increase the quantity!)
// * items in a list can be crossed off
const Item = new mongoose.Schema({
    cartName: String,
    name: {type: String, required: true},
    price: { type: Number, min: 0},
    amount: Number
});

//holds menus of food carts and holds multiple items and proces
const Cart = new mongoose.Schema({
    cartName: {type: String, required: true},
    items: [Item],
    phoneNumber: String

});


const User = new mongoose.Schema({
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    order: [Item],
    sessionID: {type: String, required: true},
    total: Number
});

// is the environment variable, NODE_ENV, set to PRODUCTION?
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
    // if we're in PRODUCTION mode, then read the configration from a file
    // use blocking file io to do this...
    const fs = require('fs');
    const path = require('path');
    const fn = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(fn);

    // our configuration file will be in json, so parse it and set the
    // conenction string appropriately!
    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
    // if we're not in PRODUCTION mode, then use
    dbconf = 'mongodb://localhost/syi211';
}




mongoose.model('User', User);
mongoose.model('Item', Item);


mongoose.connect(dbconf);

