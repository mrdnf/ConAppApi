const mongoose = require('mongoose'); 

var OpssellcreditSchema = new mongoose.Schema({

    ops: { type: String,   default: 'sell' },
    
    customer: {type : mongoose.Schema.ObjectId, ref : 'Customer'},
    customerName:  String,

    store:   {type : mongoose.Schema.ObjectId, ref : 'Store'},
    storeName: String,

    product:   {type : mongoose.Schema.ObjectId, ref : 'Product'},
    productName: String,

    unit:  String,

    quantity: Number,
    price: Number,
    total: Number,
    paymentType: {  type: String,   default:'credit' },
    
    accounting: [
        {
        id: {type : mongoose.Schema.ObjectId, ref : 'Bank'} ||{type : mongoose.Schema.ObjectId, ref : 'Customer'},
        credit:  { type: Number, default: 0 },
        debit: Number,
        details: {type:String, required:true},
        date: { type: String, default: new Date() }
    }
],

    storebalance: [{
        store: {type : mongoose.Schema.ObjectId, ref : 'Store'},
        product: {type : mongoose.Schema.ObjectId, ref : 'Product'},
        productName: String,
        unit: String, 
        in: { type: Number, default: 0 },
        out: Number,
        date: { type: String, default: new Date() }
    }]
},
{ timestamps: true });

module.exports = mongoose.model('Opssellcredit', OpssellcreditSchema, 'Operation');