const mongoose = require('mongoose');

const cashboxSchema = new mongoose.Schema({

    name: { type: String, required: [true, 'Please add a name'] }
    
},{  toJSON: { virtuals: true },  toObject: { virtuals: true }  , timestamps: true } );

// Reverse populate with virtuals
cashboxSchema.virtual('accounts', {
 ref: 'Operation',
 localField: '_id',
 foreignField: 'accounting.id',
 justOne: false
}); 

module.exports = mongoose.model('Cashbox', cashboxSchema, 'Cashbox');