// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// users

const User = new mongoose.Schema({
  name: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    order: [Item]
});

// an item (or group of the same items) in a grocery list
// * includes the quantity of this item (multiple of the same item does not 
//   require additional Item documents; just increase the quantity!)
// * items in a list can be crossed off
const Item = new mongoose.Schema({
  name: {type: String, required: true},
  quantity: {type: Number, min: 1, required: true},
  price: {type: Boolean, default: false, required: true}
});

//holds menus of food carts and holds multiple items and proces
const Cart = new mongoose.Schema({
  cartName: {type: String, required: true},
  items: [Item],
    phoneNumber: String
});



