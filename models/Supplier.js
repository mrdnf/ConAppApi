const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({

    name: { type: String, required: [true, 'Please add a name'] }
    
},{  toJSON: { virtuals: true },  toObject: { virtuals: true }  ,  timestamps: true } );

   // Reverse populate with virtuals
   SupplierSchema.virtual('product', {
    ref: 'SupplierProduct',
    localField: '_id',
    foreignField: 'supplier',
    justOne: false
  }); 

  // Reverse populate with virtuals
  SupplierSchema.virtual('accounts', {
  ref: 'Operation',
  localField: '_id',
  foreignField: 'accounting.id',
  justOne: false
 });




module.exports = mongoose.model('Supplier', SupplierSchema, 'Supplier');


  
