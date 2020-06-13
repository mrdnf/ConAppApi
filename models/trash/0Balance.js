const mongoose = require('mongoose'); 

var BalanceSchema = new mongoose.Schema({

        no: {type : mongoose.Schema.ObjectId, ref : 'Operation'},
        store: {type : mongoose.Schema.ObjectId, ref : 'Store'},
        product: {type : mongoose.Schema.ObjectId, ref : 'Product'},
        unit: {type:String, enum: ['s', 'l']},
        in: Number,
        out: Number


},
{ timestamps: true });

  
module.exports = mongoose.model('Balance', BalanceSchema, 'Balance');
    
    