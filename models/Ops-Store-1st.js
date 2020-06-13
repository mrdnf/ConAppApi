const mongoose = require('mongoose'); 

var OpsStore1stSchema = new mongoose.Schema({



    ops: { type: String,   default: '1st balance' },

    store:   {type : mongoose.Schema.ObjectId, ref : 'Store'},
    product:   {type : mongoose.Schema.ObjectId, ref : 'Product'},


    storebalance: [{
        store: {type : mongoose.Schema.ObjectId, ref : 'Store'},
        product: {type : mongoose.Schema.ObjectId, ref : 'Product'},
        unit: {type:String, enum: ['s', 'l']},
        in: Number,
        out:{ type: Number, default: 0 },
        details: { type: String, default: "1st balance" }
    }]
},
{ timestamps: true });

/* OpsStore1stSchema.pre('validate', function(next) {
    if (this.credit == undefined && this.depit == undefined) {
        next(new Error('credit or depit Must have value'));
    } else {
        next();
    }
});  */
  

module.exports = mongoose.model('OpsStore1st', OpsStore1stSchema, 'Operation');