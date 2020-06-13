const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({

    name: { type: String, required: [true, 'Please add a name'] }
    
},{  /* toJSON: { virtuals: true },  toObject: { virtuals: true }  , */ timestamps: true } );

// Reverse populate with virtuals
CustomerSchema.virtual('accounts', {
 ref: 'Operation',
 localField: '_id',
 foreignField: 'accounting.id',
 justOne: false
});




module.exports = mongoose.model('Customer', CustomerSchema, 'Customer');


  
