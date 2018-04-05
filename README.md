
(Quick Cart)

## Overview

(___TODO__: a brief one or two paragraph, high-level description of your project_)


Food Cart Order Streamlining 

This web places orders so you can avoid waiting around the food cart for your food. 

Need to build a messing system that communicates between two devices. 

Shows menu and prices. 

Make a cart so users can place multiple items in the cart 

After desired items are put into the cart the user can place an order and it will go to the cart so they can start preparing your order and you can pick it up after its ready 

Imagine a situation where you want to eat at a food cart but you dont want to wait outside the cart while the food is being prepared. 
This is where this app comes in. 
This app takes an order for food from a food cart and tells the cart to prepare your order so you can pick it up 


## Data Model

(___TODO__: a description of your application's data and their relationships to each other_) 

The application will store Users, Lists and Items

This application will store

Food cart locations (can have multiple),
name, 
menu, 
food items (multiple lists )
prices (miltiple ists)


(___TODO__: sample documents_)

An Example User:


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





## [Link to Commented First Draft Schema](db.js) 

(___TODO__: create a first draft of your Schemas in db.js and link to it_)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

( draw out a site map that shows how pages are related to each other_)

In:  documentation/siteMap.jpg

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list


1. users do not need to register 
2. as a user I can create an order 
3. as an user I can select a cart  
4. as a user, I can put multiple items in my cart 
5. as a user, I can place an order and the food will start to be prepared



## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)


(6 points) Integrate messaging backend with twillio and ngrok 
    I am going to be using twillio and ngrok to formulte an order and send it over to the cart 
    
    
* (2 points) bootstrap 
    I will use bootstrap for styling my web app 
    

## [app.js](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)


## Annotations / References Used
ff
(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

2. [https://www.twilio.com/docs/libraries/node]
3. [http://bootstrapdocs.com/v3.0.3/docs/css/]
4 [https://ngrok.com/docs]
5. [https://developers.google.com/maps/documentation/javascript/]