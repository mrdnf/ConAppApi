const mongoose = require('mongoose'); 

var OperationSchema = new mongoose.Schema({
    
    ops: { type: String,  default: '1st balance'  },
    cash: {type : mongoose.Schema.ObjectId, ref : 'Cash'},
    cashName: String,
    total:String,
    accounting: [{
        id: {type : mongoose.Schema.ObjectId, ref : 'Cash'} ,
        credit: Number,
        debit: { type: Number, default: 0 },
        details: { type: String },
        date: { type: String, default: new Date() }
    }]
},
{ timestamps: true });

module.exports = mongoose.model('opsCash1st', OperationSchema, 'Operation');