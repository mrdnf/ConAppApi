const mongoose = require('mongoose'); 

var AccountingSchema = new mongoose.Schema({

        no: {type : mongoose.Schema.ObjectId, ref : 'Operation'},
        id: {type : mongoose.Schema.ObjectId, ref : 'Bank'} ||  {type : mongoose.Schema.ObjectId, ref : 'Cash'} || {type : mongoose.Schema.ObjectId, ref : 'Customer'} || {type : mongoose.Schema.ObjectId, ref : 'Supplier'},
        credit: Number,
        debit: Number,
        details: {type:String, required:true}


},
{ timestamps: true });

  
module.exports = mongoose.model('Accounting', AccountingSchema, 'Accounting');
    
