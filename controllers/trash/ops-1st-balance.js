const Operation = require('../models/Ops-Store-1st');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


// @description Get All acconts
// Rout GET api/v1/operation
//Access Public 
exports.getOperations =  asyncHandler(async (req, res, next) => {

    const operations = await Operation.find({ storebalance: { $elemMatch: { details: "1st balance" } } });
    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        data: operations
    });
});


// @description Get Single operation
// Rout GET api/v1/operation/:id
//Access Public 
exports.getOperation =  asyncHandler(async (req, res, next) => {

    const operation = await Operation.find({_id: req.params.id, storebalance: { $elemMatch: { details: "1st balance" } } });

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        data: operation
    });
});


exports.postOperation =  asyncHandler(async (req, res, next) => {
    let operation = await Operation.find({store: req.body.store, product: req.body.product});
    if(operation){
        res.status(200).json({
            state: false,
            msg: `this store allready have 1st balance from that product`,
        });
    } else {
            const operation = await Operation.create(req.body);

    res.status(200).json({
        state: true,
        msg: `New operation - ${req.body.name} - Created successfully`,
        data: operation
    });
    }

});

// @description update operation
// Rout PUT api/v1/operation/:id
//Access Private 
exports.updateOperation =  asyncHandler(async (req, res, next) => {

    let operation = await Operation.findById(req.params.id);

    if (!operation) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    bank = await Operation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        state: true,
        msg: `Operation ( ${req.params.id} ) Updated Successfully`,
        data: operation
    });
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