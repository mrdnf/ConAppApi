const mongoose = require('mongoose'); 

var OpsbuycreditSchema = new mongoose.Schema({



    ops: { type: String,   default: 'buy' },

    supplier: {type : mongoose.Schema.ObjectId, ref : 'Supplier'},
    supplierName:  String,

    store:   {type : mongoose.Schema.ObjectId, ref : 'Store'},
    storeName: String,

    product:   {type : mongoose.Schema.ObjectId, ref : 'Product'},
    productName: String,

    unit: String,
    quantity: Number,
    price: Number,
    total: Number,
    paymentType: {  type: String,   default:'credit' },

    accounting: [
    {
        id:{type : mongoose.Schema.ObjectId, ref : 'Supplier'},
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
        unit: String,
        in: Number,
        out: { type: Number, default: 0 },
        date: { type: String, default: new Date() }
    
    }]
},
{ timestamps: true });

  

module.exports = mongoose.model('Opsbuycredit', OpsbuycreditSchema, 'Operation');