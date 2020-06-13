const mongoose = require('mongoose'); 


var ProductSchema = new mongoose.Schema({

    name:{type:String, required:true, unique:true, index:true},
    unit:{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Unit'},


},{ toJSON: { virtuals: true } ,   toObject: { virtuals: true },   timestamps: true } );

ProductSchema.virtual('supplier', {
    ref: 'SupplierProduct',
    localField: '_id',
    foreignField: 'product',
    justOne: false
  }); 
  
  ProductSchema.set('toJSON', { virtuals: true });





module.exports = mongoose.model('Product', ProductSchema, 'Product');