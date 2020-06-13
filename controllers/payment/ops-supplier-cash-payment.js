const Operation = require('../../models/payment/Ops-supplier-cash-payment');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');


// @description Get All acconts
// Rout GET api/v1/operation
//Access Public 
exports.getOperations =  asyncHandler(async (req, res, next) => {

    let query = { };

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
exports.getOperation = asyncHandler(async (req, res, next) => {
    const operation = await Operation.findOne({
        _id: req.params.id,
        cash: { $exists: false },
        store: { $exists: false },
        customer: { $exists: false },
        supplier: { $exists: false },
        product: { $exists: false },
        bank: { $exists: true },
        accounting: { $elemMatch: { details: "1st balance" } }
    
    });

    if (!operation) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }
    res.status(200).json({
        state: true,
        msg: 'Fetch Single operation Successfully',
        data: operation
    });
});


exports.postOperation =  asyncHandler(async (req, res, next) => {



    let ops = await Operation.find({ops: "1st balance", bank: req.body.bank } );
    if( ops.length > 0 ){

        return next(new ErrorResponse("this bank already have 1st balance", 400));
                
    } else {

        const bank = await Bank.findById(req.body.bank);
        const operation = await Operation.create(req.body);
    
        res.status(200).json({
            state: true,
            msg: `New operation to add (${operation.ops}) to bank (${bank.name}) - Created successfully`,
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