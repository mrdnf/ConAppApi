const Operation = require('../../models/1st/Ops-Store-1st');

const Product = require('../../models/Product');
const Store = require('../../models/Store');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');


// @description Get All acconts
// Rout GET api/v1/operation
//Access Public 
exports.getOperations =  asyncHandler(async (req, res, next) => {

    let query = {     ops: "1st balance" , store: { $exists: true } , product: { $exists: true }   };

    const operations = await Operation.find(query).sort({createdAt: -1});

    let operationsCount = await Operation.find(query).countDocuments();

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        count: operationsCount,
        data: operations
    });
});


// @description Get Single operation
// Rout GET api/v1/operation/:id
//Access Public 
exports.getOperation =  asyncHandler(async (req, res, next) => {

    const operation = await Operation.find({_id: req.params.id, ops: "1st balance" , store: { $exists: true } , product: { $exists: true }});

    res.status(200).json({
        state: true,
        msg: 'Fetch Single operation Successfully ',
        data: operation
    });
});


exports.postOperation =  asyncHandler(async (req, res, next) => {

    let productx = await Product.findOne({_id: req.body.product}).populate('unit');
    let storex = await Store.findOne({_id: req.body.store});
    let unitx = req.body.unit;

    let ops = await Operation.find({ops: "1st balance", store: req.body.store, product: req.body.product } );
    if( ops.length > 0 ){

        return next(new ErrorResponse("this store already have opening balance from that product", 400));
                
    } else {

        let year = new Date().getFullYear();

        let payload = {
            store: req.body.store,
            storeName: storex.name,
            product: req.body.product,
            productName: productx.name,
            unit: productx.unit.small,
            quantity: unitx == productx.unit.large? req.body.quantity * productx.unit.ratio : req.body.quantity,
            storebalance: [{
                store: req.body.store,
                storeName: storex.name,
                product: req.body.product,
                productName: productx.name,
                unit: productx.unit.small,
                in: unitx == productx.unit.large? req.body.quantity * productx.unit.ratio : req.body.quantity,
                details: `${year} Opening balance for store: ${storex.name} to Product: ${productx.name} `
        }] };


        let operation = await Operation.create(payload);
        res.status(200).json({ 
            state: true, 
            msg: `New operation to add  ${req.body.ops} to store ${req.body.store} - Created successfully`, 
            data: operation}); 
    }
        
});



// @description update operation
// Rout PUT api/v1/operation/:id
//Access Private 
exports.updateOperation =  asyncHandler(async (req, res, next) => {

    let opsbyid = await Operation.findOne({_id: req.params.id}, {_id:1});
    let opsbydata = await Operation.findOne({ops: "1st balance", store: req.body.store, product: req.body.product } , {_id:1});

    let id = JSON.stringify(opsbyid._id);
    let data = JSON.stringify(opsbydata._id)

    let productx = await Product.findOne({_id: req.body.product}).populate('unit');
    let storex = await Store.findOne({_id: req.body.store});
    let unitx = req.body.unit;
    let year = new Date().getFullYear();


    if ( id == data){

        let payload = {
            store: req.body.store,
            storeName: storex.name,
            product: req.body.product,
            productName: productx.name,
            unit: productx.unit.small,
            quantity: unitx == productx.unit.large? req.body.quantity * productx.unit.ratio : req.body.quantity,
            storebalance: [{
                store: req.body.store,
                storeName: storex.name,
                product: req.body.product,
                productName: productx.name,
                unit: productx.unit.small,
                in: unitx == productx.unit.large? req.body.quantity * productx.unit.ratio : req.body.quantity,
                details: `${year} Opening balance for store: ${storex.name} to Product: ${productx.name} `
        }] };





        let filter = {_id: req.params.id};
        let replacement =  payload ;
        let options = { new: true };         //findOneAndUpdate
        let options2 = { upsert: true };         //replaceOne
        //update
        //let operation = await Operation.findOneAndUpdate(filter, replacement, options);
        let operation = await Operation.replaceOne(filter, replacement, options2);
        res.status(200).json({
            state: true,
            msg: ` Operation updated successfully`
        }); 

        


    }else if (!opsbyid) {     
        


            return next(new ErrorResponse(`Operation with that id : ${req.params.id} not found`, 404));

        
    }else if( id !== data){


            return next(new ErrorResponse("this store already have opening balance from that product", 400));


    }

});


// @description Delete operation
// Rout DELETE api/v1/operation/:id
//Access Private 
exports.deleteOperation = asyncHandler(async (req, res, next) => {

    const operation = await Operation.findByIdAndDelete(req.params.id);

    if (!operation) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    res.status(201).json({
        state: true,
        msg: `Operation ( ${req.params.id} ) Deleted Successfully`,
    });
});