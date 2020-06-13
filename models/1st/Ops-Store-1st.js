const mongoose = require('mongoose'); 
//const Product = require('../models/Product')

var OpsStore1stSchema = new mongoose.Schema({



    ops: { type: String,   default: '1st balance' },

    store:   {type : mongoose.Schema.ObjectId, ref : 'Store'},
    storeName: String,
    product:   {type : mongoose.Schema.ObjectId, ref : 'Product'},
    productName: String,
    unit: String,
    quantity: Number,

    storebalance: [{
        store: {type : mongoose.Schema.ObjectId, ref : 'Store'},
        storeName: String,
        product: {type : mongoose.Schema.ObjectId, ref : 'Product'},
        productName: String,
        unit: String,
        in: Number,
        out:{ type: Number, default: 0 },
        details: { type: String },
        date: { type: String, default: new Date() }
    }]
},
{ timestamps: true });

  

module.exports = mongoose.model('OpsStore1st', OpsStore1stSchema, 'Operation');