

const mongoose = require('mongoose'); 


var ProductBalanceSchema = new mongoose.Schema({

    store: { type: mongoose.Schema.ObjectId,   ref: 'Store', required: true},

    product: { type: mongoose.Schema.ObjectId,   ref: 'Product', required: true},

    quantity: Number,

},
{ timestamps: true });



module.exports = mongoose.model('ProductBalance', ProductBalanceSchema, 'ProductBalance');