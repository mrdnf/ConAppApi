const Operation = require('../../models/1st/Ops-cash-1st');
const Cash = require('../../models/Cashbox');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');


// @description Get All 1stBalance For Cash 
// Rout GET api/v1/operation
//Access Public 
exports.getOperations =  asyncHandler(async (req, res, next) => {

    
let query = {
    ops: "1st balance" ,
    cash: { $exists: true }
};

    const operations = await Operation.find(query).sort({createdAt: -1});

    const operationsCount = await Operation.find(query).countDocuments();

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
    
let query = {
    _id: req.params.id,
    ops: "1st balance" ,
    cash: { $exists: true }};   

     
    const operation = await Operation.findOne(query);


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

    let ops = await Operation.find({ ops: "1st balance", cash: req.body.cash });
  if (ops.length > 0) {
    return next(
      new ErrorResponse("this cash already have opening balance", 400)
    );
  } else {
    const cashx = await Cash.findById(req.body.cash);
    let year = new Date().getFullYear();
    let payload;
    if (req.body.credit) {
      payload = {
        cash: req.body.cash,
        cashName: cashx.name,
        total: req.body.total,
        accounting: [
          {
            id: req.body.cash,
            details: `${year} Opening balance to CashBox: ${cashx.name}`,
            credit: req.body.total,
            debit: 0,
          },
        ],
      };
    } else {
      payload = {
        cash: req.body.cash,
        cashName: cashx.name,
        total: req.body.total,
        accounting: [
          {
            id: req.body.cash,
            details: `${year} Opening balance to CashBox: ${cashx.name}`,
            credit: 0,
            debit: req.body.total,
          },
        ],
      };
    }

    const operation = await Operation.create(payload);

    res.status(200).json({
      state: true,
      msg: `New operation to add (${operation.ops}) to CashBox: (${cashx.name}) to the year: ${year} - Created successfully`,
      data: operation,
    });
  }
    // let ops = await Operation.find({ops: "1st balance", cash: req.body.cash } );
    // if( ops.length > 0 ){
    //     return next(new ErrorResponse("this cash already have opening balance", 400));
    // }else{
    //     const cashx = await Cash.findById(req.body.cash);

    //     let year = new Date().getFullYear();
    //     let payload = {


    //         cash: req.body.cash,
    //         cashName: cashx.name,
    //         accounting: [
    //             {
    //                 id: req.body.cash,
    //                 details: `${year} opening balance to cash: ${cashx.name}`,
    //                 credit: req.body.credit
    //             }
    //         ]
    //     };

    //     const operation = await Operation.create(payload);

    //     res.status(200).json({
    //         state: true,
    //         msg: `New operation to add (${operation.ops}) to cashbox: (${cashx.name}) to the year: ${year} - Created successfully`,
    //         data: operation
    //     });


    // }

});

// @description update operation
// Rout PUT api/v1/operation/:id
//Access Private 
exports.updateOperation =  asyncHandler(async (req, res, next) => {

    let operation = await Operation.findById(req.params.id);
    let cashx = await Cash.findById(req.body.cash);

               if (req.body.credit) {
                 console.log("credit");
                         let newoperation = await Operation.updateOne({_id: req.params.id, 'accounting.credit': operation.accounting[0].credit}, {$set: {total: req.body.total, "accounting.$.credit" : req.body.total, "accounting.$.debit" : 0}}, {
                             new: true,
                             runValidators: true
                         } );
             }else{
                 console.log("Debit");
                         let newoperation = await Operation.updateOne({_id: req.params.id, 'accounting.debit': operation.accounting[0].debit}, {$set: {total: req.body.total, "accounting.$.credit" : 0, "accounting.$.debit" : req.body.total}}, {
                             new: true,
                             runValidators: true
                         } );

}      
     


 res.status(200).json({
     state: true,
     msg: `Operation ( ${operation.ops} ) to CashBox (${cashx.name}) Updated Successfully to be (${req.body.credit})`,


 }); 
    // let operation = await Operation.findById(req.params.id);

    // if (!operation) {
    //     return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    // }

    // let newoperation = await Operation.updateOne({_id: req.params.id, 'accounting.credit': operation.accounting[0].credit}, {$set: {"accounting.$.credit" : req.body.credit}}, {
    //     new: true,
    //     runValidators: true
    //  } );

    // const cash = await Cash.findById(operation.cash);

    // res.status(200).json({
    //     state: true,
    //     msg: `Operation ( ${operation.ops} ) to cash (${cash.name}) Updated Successfully to be (${req.body.credit})`,


    // });
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