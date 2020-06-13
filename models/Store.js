
const mongoose = require('mongoose'); 

let StoreSchema = new mongoose.Schema({

    name: {type:String, required:true}

},{  toJSON: { virtuals: true },  toObject: { virtuals: true }  , timestamps: true } );

   // Reverse populate with virtuals
  StoreSchema.virtual('balance', {
    ref: 'Operation',
    localField: '_id',
    foreignField: 'storebalance.store',
    justOne: false
  }); 



module.exports = mongoose.model('Store', StoreSchema, 'Store');