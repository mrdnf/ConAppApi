const mongoose = require('mongoose'); 

var OpssellcashSchema = new mongoose.Schema({


    ops: { type: String,   default: 'sell' },

    product:   {type : mongoose.Schema.ObjectId, ref : 'Product'},
    productName: String,

    cash: {type : mongoose.Schema.ObjectId, ref : 'Cash'},
    cashName:  String,

    // customer:   {type : mongoose.Schema.ObjectId, ref : 'Customer'},
    // customerName:  String,

    store:   {type : mongoose.Schema.ObjectId, ref : 'Store'},
    storeName: String,

    unit: String,

    quantity: Number,
    price: Number,
    total: Number,

    paymentType: {  type: String,   default:'cash' },

    accounting: [
 {
        id: {type : mongoose.Schema.ObjectId, ref : 'Cash'} ,
        credit: Number,
        debit: { type: Number, default: 0 },
        details: {type:String, required:true},
        date: { type: String, default: new Date() }
    }
],

    storebalance: [{
        store: {type : mongoose.Schema.ObjectId, ref : 'Store'},
        storeName: String,
        product: {type : mongoose.Schema.ObjectId, ref : 'Product'},
        productName: String,
        unit: String, 
        in: { type: Number, default: 0 },
        out: Number,
        date: { type: String, default: new Date() }
    }]
},
{ timestamps: true });

  

module.exports = mongoose.model('Opssellcash', OpssellcashSchema, 'Operation');