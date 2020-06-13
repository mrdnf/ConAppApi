

const mongoose = require('mongoose'); 


var SupplierProductSchema = new mongoose.Schema({

    supplier: { type: mongoose.Schema.ObjectId,   ref: 'Supplier', required: true},

    product: { type: mongoose.Schema.ObjectId,   ref: 'Product', required: true}


},
{ timestamps: true });



module.exports = mongoose.model('SupplierProduct', SupplierProductSchema, 'SupplierProduct');