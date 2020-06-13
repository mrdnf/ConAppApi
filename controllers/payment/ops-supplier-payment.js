const Operation = require('../../models/payment/Ops-supplier-payment');

const Supplier = require('../../models/Supplier');
const Cash = require('../../models/Cashbox');
const Bank = require('../../models/Bank');

const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');


// @description Get All acconts
// Rout GET api/v1/operation
//Access Public 
exports.getOperations =  asyncHandler(async (req, res, next) => {
    let query = { ops: "payment", supplier: { $exists: true }};
   
    const operations = await Operation.find(query).sort({createdAt: -1});

    let operationsCount = await Operation.find(query).countDocuments();

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        count: operationsCount,
        data: operations
    });
});
//=========================================================================================
exports.getOperationsc =  asyncHandler(async (req, res, next) => {
    let query = { ops: "payment", paymentType: "cash", supplier: { $exists: true }};
    
    const operations = await Operation.find(query).sort({createdAt: -1});

    let operationsCount = await Operation.find(query).countDocuments();

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        count: operationsCount,
        data: operations
    });
});
//===========================================================================================
exports.getOperationsb =  asyncHandler(async (req, res, next) => {
    let query = { ops: "payment", paymentType: "bank", supplier: { $exists: true }};

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
    const operation = await Operation.findById(req.params.id);

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
let cashx =         await Cash.findOne({_id: req.body.cash});
let bankx =         await Bank.findOne({_id: req.body.bank});
let supplierx = await Supplier.findOne({_id: req.body.supplier});
let payload;
if(req.body.method){

    payload = {
        supplier      : req.body.supplier,
        supplierName  : supplierx.name,
        cash          : req.body.cash,
        cashName      : cashx.name,
        total         : req.body.total,
        method        : req.body.method,
        accounting    : [
                            {   id: req.body.cash,
                                debit: 0,
                                credit: req.body.total,
                                details: `Cash Supplier Payment - to Supplier: ${supplierx.name}`
                            },
                        
                            {   id: req.body.supplier,
                                debit: req.body.total,
                                credit: 0,
                                details: `Cash Supplier Payment - in ${cashx.name} CashBox`
                            }
                        ]
    };
}  else {

    payload = {
        supplier      : req.body.supplier,
        supplierName  : supplierx.name,
        bank          : req.body.bank,
        bankName      : bankx.name,
        total         : req.body.total,
        method        : req.body.method,
        accounting    : [
                            {   id: req.body.bank,
                                debit: 0,
                                credit: req.body.total,
                                details: `Bank Supplier Payment - to Supplier: ${supplierx.name}`
                            },
                        
                            {   id: req.body.customer,
                                debit: req.body.total,
                                credit: 0,
                                details: `Bank Supplier Payment - in ${bankx.name} Bank`
                            }
                        ]
    };

}


    const operation = await Operation.create(payload);

    res.status(200).json({
        state: true,
        msg: `New Payment operation Created successfully`,
        data: operation
    });



});

// @description update operation
// Rout PUT api/v1/operation/:id
//Access Private 
exports.updateOperation =  asyncHandler(async (req, res, next) => {
    let cashx =         await Cash.findOne({_id: req.body.cash});
    let bankx =         await Bank.findOne({_id: req.body.bank});
    let supplierx = await Supplier.findOne({_id: req.body.supplier});
    let payload;

if(req.body.method){

    payload = {
        supplier      : req.body.supplier,
        supplierName  : supplierx.name,
        cash          : req.body.cash,
        cashName      : cashx.name,
        total         : req.body.total,
        method        : req.body.method,
        accounting    : [
                            {   id: req.body.cash,
                                debit: 0,
                                credit: req.body.total,
                                details: `Cash Supplier Payment - to Supplier: ${supplierx.name}`
                            },
                        
                            {   id: req.body.supplier,
                                debit: req.body.total,
                                credit: 0,
                                details: `Cash Supplier Payment - in ${cashx.name} CashBox`
                            }
                        ]
    };
}  else {

    payload = {
        supplier      : req.body.supplier,
        supplierName  : supplierx.name,
        bank          : req.body.bank,
        bankName      : bankx.name,
        total         : req.body.total,
        method        : req.body.method,
        accounting    : [
                            {   id: req.body.bank,
                                debit: 0,
                                credit: req.body.total,
                                details: `Bank Supplier Payment - to Supplier: ${supplierx.name}`
                            },
                        
                            {   id: req.body.customer,
                                debit: req.body.total,
                                credit: 0,
                                details: `Bank Supplier Payment - in ${bankx.name} Bank`
                            }
                        ]
    };

}



//var
let filter = {_id: req.params.id};
let replacement =  payload ;
let options = { new: true };         //findOneAndUpdate
let options2 = { upsert: true };         //replaceOne
//update
//let operation = await Operation.findOneAndUpdate(filter, replacement, options);
let operation = await Operation.replaceOne(filter, replacement, options2);
res.status(200).json({
    state: true,
    msg: ` Operation updated successfully`,
    data: operation
}); 


    // var opsx = await Operation.findById(req.params.id)
    // if(req.params.type == opsx.paymentType){

    //     const supplierx = await Supplier.findById(req.body.supplier);
    // let typePay ;
    // if(req.params.type=='bank'){
    //   typePay = await Bank.findById(req.body.bank);
    //   req.body.paymentType = 'bank';
    // }else if(req.params.type=='cash'){
    //     typePay = await Cash.findById(req.body.cash);
    //     req.body.paymentType = 'cash';
    // }else(
    //     res.status(400).json({
    //         state: true,
    //         msg:'payment type error',
    //         data: operation
    //     })
    // )
  

    // req.body.accounting = 
    // [ 
    //     {  id: typePay._id,
    //         debit:req.body.total,
    //         credit:  0,
    //         details: `supplier payment -  ${supplierx.name} - ${req.params.type} `
    //     },
    //     { id: req.body.supplier,
    //         debit: 0,
    //         credit: req.body.total,
    //         details:req.params.type=='cash'? ` supplier payment -  ${req.params.type} in ${typePay.name} branch` : `supplier Bank payment  in ${typePay.name}`
    //     }
    // ];
    // const operation = await Operation.findByIdAndUpdate(req.params.id,req.body,{new:true});

    // res.status(200).json({
    //     state: true,
    //     msg: `payment operation updated successfully`,
    //     data: operation
    // });

    // }else{
    //     res.status(400).json({
    //         state: true,
    //         msg:'payment type error',
    //     })
    // }
    

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













// let query;
// if(req.params.type=='all'){
//     query = { ops: "payment", supplier: { $exists: true }};
// }else if(req.params.type == 'bank'){
//  query = { ops: "payment", paymentType: "bank", supplier: { $exists: true }};
// }else if (req.params.type == "cash"){
//      query = { ops: "payment", paymentType: "cash", supplier: { $exists: true }};
// }else {
//      query = { ops: "payment", supplier: { $exists: true }};
// }
// const operations = await Operation.find(query).sort({createdAt: -1});

// let operationsCount = await Operation.find(query).countDocuments();

// res.status(200).json({
//     state: true,
//     msg: 'Get All Resource Data From Database',
//     count: operationsCount,
//     data: operations
// });