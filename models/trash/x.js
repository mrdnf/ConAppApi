const mongoose = require('mongoose'); 

var AccountSchema = new mongoose.Schema({

    accounting: [  {

    id: {type : mongoose.Schema.ObjectId, ref : 'Bank'} ||  {type : mongoose.Schema.ObjectId, ref : 'Cash'} || {type : mongoose.Schema.ObjectId, ref : 'Customer'} || {type : mongoose.Schema.ObjectId, ref : 'Supplier'},
    credit: Number,
    debit: Number,
    details: {type:String, required:true}
    
    }  ],

    ops: {  type: String,   enum: ['buy', 'sell', 'payment', '1st balance', 'transfeer'],  required: true  },
    customer: {type : mongoose.Schema.ObjectId, ref : 'Customer'},
    supplier: {type : mongoose.Schema.ObjectId, ref : 'Supplier'},
    bank: {type : mongoose.Schema.ObjectId, ref : 'Bank'},
    cash: {type : mongoose.Schema.ObjectId, ref : 'Cash'},
    store:   {type : mongoose.Schema.ObjectId, ref : 'Store'},
    product:   {type : mongoose.Schema.ObjectId, ref : 'Product'},
    unit: {type : mongoose.Schema.ObjectId, ref : 'Product'},
    quantity: Number,
    price: Number,
    paymentType: {  type: String,   enum: ['cash', 'bank', 'credit']  }
},
{ timestamps: true });

/* AccountSchema.pre('validate', function(next) {
    if (this.credit == undefined && this.depit == undefined) {
        next(new Error('credit or depit Must have value'));
    } else {
        next();
    }
});  */
  

module.exports = mongoose.model('Account', AccountSchema, 'Account');