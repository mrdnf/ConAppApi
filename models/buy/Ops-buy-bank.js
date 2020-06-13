const mongoose = require('mongoose'); 

var OpsbuybankSchema = new mongoose.Schema({



    ops: { type: String,   default: 'buy' },



    supplier: {type : mongoose.Schema.ObjectId, ref : 'Supplier'},
    supplierName:  String,

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
        id: {type : mongoose.Schema.ObjectId, ref : 'Bank'} || {type : mongoose.Schema.ObjectId, ref : 'Supplier'},
        credit: Number,
        debit: Number,
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
        in: Number,
        out: { type: Number, default: 0 },
        date: { type: String, default: new Date() }
    }]
},
{ timestamps: true });




module.exports = mongoose.model('Opsbuybank', OpsbuybankSchema, 'Operation');