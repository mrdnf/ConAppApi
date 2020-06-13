const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({

    name: { type: String, required: [true, 'Please add a name'] }
    
},{  toJSON: { virtuals: true },  toObject: { virtuals: true }  , timestamps: true } );

// Reverse populate with virtuals
bankSchema.virtual('accounts', {
 ref: 'Operation',
 localField: '_id',
 foreignField: 'accounting.id',
 justOne: false
}); 
module.exports = mongoose.model('Bank', bankSchema, 'Bank');