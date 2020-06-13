const mongoose = require('mongoose'); 

var OpscustomerpaymentSchema = new mongoose.Schema({



    ops: {  type: String,   default: 'payment',  required: true  },
    customer: {type : mongoose.Schema.ObjectId, ref : 'Customer'},
    customerName: String,
    bank: {type: mongoose.Schema.ObjectId, ref : 'Bank'},
    bankName: String,
    cash: {type: mongoose.Schema.ObjectId, ref : 'Cash'},
    cashName: String,
    paymentType: {  type: String,   enum: ['cash', 'bank']  },
    total: Number,
    method: Boolean,
    
    
    accounting: [{
        id: {type : mongoose.Schema.ObjectId, ref : 'Bank'} ||  {type : mongoose.Schema.ObjectId, ref : 'Cash'} || {type : mongoose.Schema.ObjectId, ref : 'Customer'} ,
        credit: Number,
        debit: Number,
        details: {type:String, required:true},
        date: { type: String, default: new Date() }
    }]
},
{ timestamps: true });

  
module.exports = mongoose.model('Opscustomerpayment', OpscustomerpaymentSchema, 'Operation');