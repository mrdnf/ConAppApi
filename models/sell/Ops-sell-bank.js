const mongoose = require('mongoose'); 

var OpssellbankSchema = new mongoose.Schema({


    ops: { type: String,   default: 'sell' },


    customer:   {type : mongoose.Schema.ObjectId, ref : 'Customer'},
    customerName:  String,

    bank: {type : mongoose.Schema.ObjectId, ref : 'Bank'},
    bankName: String,

    store:   {type : mongoose.Schema.ObjectId, ref : 'Store'},
    storeName: String,

    product:   {type : mongoose.Schema.ObjectId, ref : 'Product'},
    productName: String,

    unit: String,   /* {type:String, enum: ['s', 'l']}, */
    quantity: Number,
    price: Number,
    total: Number,
    paymentType: {  type: String,   default:'bank' },

    accounting: [
    {
        id: {type : mongoose.Schema.ObjectId, ref : 'Bank'} || {type : mongoose.Schema.ObjectId, ref : 'Customer'},
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
        unit: {type:String},   /* {type:String, enum: ['s', 'l']}, */
        in: { type: Number, default: 0 },
        out: Number,
        date: { type: String, default: new Date() }
    }]
},
{ timestamps: true });
  
module.exports = mongoose.model('Opssellbank', OpssellbankSchema, 'Operation');