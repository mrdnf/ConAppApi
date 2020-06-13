const mongoose = require('mongoose');

const DealerSchema = new mongoose.Schema({

    name: { type: String, required: [true, 'Please add a name'] },
    type: { type :String , enum : ['customer','supplier', 'both'] },
    product: [ {type : mongoose.Schema.ObjectId, ref : 'Product'} ]
    
},{  /* toJSON: { virtuals: true },  toObject: { virtuals: true }  , */ timestamps: true } );

// Reverse populate with virtuals
/* DealerSchema.virtual('accounts', {
 ref: 'Account',
 localField: '_id',
 foreignField: 'id',
 justOne: false
});  */




module.exports = mongoose.model('Dealer', DealerSchema, 'Dealer');


  
