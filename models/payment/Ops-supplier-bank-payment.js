const mongoose = require('mongoose'); 

var OpssupplierbankpaymentSchema = new mongoose.Schema({



    ops: {  type: String,   enum: ['buy', 'sell', 'payment', '1st balance', 'transfeer'],  required: true  },
    customer: {type : mongoose.Schema.ObjectId, ref : 'Customer'},
    supplier: {type : mongoose.Schema.ObjectId, ref : 'Supplier'},
    bank: {type : mongoose.Schema.ObjectId, ref : 'Bank'},
    cash: {type : mongoose.Schema.ObjectId, ref : 'Cash'},
    store:   {type : mongoose.Schema.ObjectId, ref : 'Store'},
    product:   {type : mongoose.Schema.ObjectId, ref : 'Product'},
    unit: {type:String, enum: ['s', 'l']},
    quantity: Number,
    price: Number,
    total: Number,
    paymentType: {  type: String,   enum: ['cash', 'bank', 'credit']  },
    
    accounting: [{
        id: {type : mongoose.Schema.ObjectId, ref : 'Bank'} ||  {type : mongoose.Schema.ObjectId, ref : 'Cash'} || {type : mongoose.Schema.ObjectId, ref : 'Customer'} || {type : mongoose.Schema.ObjectId, ref : 'Supplier'},
        credit: Number,
        debit: Number,
        details: {type:String, required:true}
    }],

    storebalance: [{
        store: {type : mongoose.Schema.ObjectId, ref : 'Store'},
        product: {type : mongoose.Schema.ObjectId, ref : 'Product'},
        unit: {type:String, enum: ['s', 'l']},
        in: Number,
        out: Number,
    }]
},
{ timestamps: true });

  
module.exports = mongoose.model('Opssupplierbankpayment', OpssupplierbankpaymentSchema, 'Operation');