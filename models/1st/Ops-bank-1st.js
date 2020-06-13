const mongoose = require('mongoose'); 

var opsbank1stSchema = new mongoose.Schema({

    ops: { type: String,   default: '1st balance' },
    bank: {type : mongoose.Schema.ObjectId, ref : 'Bank'},
    bankName: String,
    total:String,
    accounting: [{
        id: {type : mongoose.Schema.ObjectId, ref : 'Bank'},
        credit: Number,
        debit: Number,
        details: { type: String },
        date: { type: String, default: new Date() }
    }]
},
{ timestamps: true });

module.exports = mongoose.model('opsbank1st', opsbank1stSchema, 'Operation');