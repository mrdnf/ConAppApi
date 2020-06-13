const mongoose = require('mongoose'); 

var OpsbuycashSchema = new mongoose.Schema({



    ops: { type: String,   default: 'buy' },

    supplier: {type : mongoose.Schema.ObjectId, ref : 'Supplier'},
    supplierName:  String,


    cash: {type : mongoose.Schema.ObjectId, ref : 'Cash'},
    cashName: String,

    store:   {type : mongoose.Schema.ObjectId, ref : 'Store'},
    storeName: String,

    product:   {type : mongoose.Schema.ObjectId, ref : 'Product'},
    productName: String,

    unit: String,
    quantity: Number,
    price: Number,
    total: Number,
    paymentType: {  type: String,   default:'cash' },

    accounting: [
    {
        id: {type : mongoose.Schema.ObjectId, ref : 'Cash'} || {type : mongoose.Schema.ObjectId, ref : 'Supplier'},
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
//OpsbuycashSchema.storebalance.unit = OpsbuycashSchema.unit;

/*OpsbuycashSchema.pre('save || create || update', function(next) {
        req.body.total = this.quantity * this.price;

        next();
    
}); */  
  
module.exports = mongoose.model('Opsbuycash', OpsbuycashSchema, 'Operation');