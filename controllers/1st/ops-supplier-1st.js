const Operation = require('../../models/1st/Ops-supplier-1st');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Supplier = require('../../models/Supplier');



// @description Get All acconts
// Rout GET api/v1/operation
//Access Public 
exports.getOperations =  asyncHandler(async (req, res, next) => {

    
let query = {
    ops: "1st balance" ,
    supplier: { $exists: true },

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
exports.getOperation =  asyncHandler(async (req, res, next) => {


let query = {
    _id: req.params.id,
    ops: "1st balance" ,
    supplier: { $exists: true }};   

 
     
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


    let ops = await Operation.find({ ops: "1st balance", supplier: req.body.supplier });
    if (ops.length > 0) {
      return next(
        new ErrorResponse("this supplier already have opening balance", 400)
      );
    } else {
      const supplierx = await Supplier.findById(req.body.supplier);
      let year = new Date().getFullYear();
      let payload;
      if (req.body.credit) {
        payload = {
          supplier: req.body.supplier,
          supplierName: supplierx.name,
          total: req.body.total,
          accounting: [
            {
              id: req.body.supplier,
              details: `${year} Opening balance to Supplier: ${supplierx.name}`,
              credit: req.body.total,
              debit: 0,
            },
          ],
        };
      } else {
        payload = {
          supplier: req.body.supplier,
          supplierName: supplierx.name,
          total: req.body.total,
          accounting: [
            {
              id: req.body.supplier,
              details: `${year} Opening balance to Supplier: ${supplierx.name}`,
              credit: 0,
              debit: req.body.total,
            },
          ],
        };
      }
  
      const operation = await Operation.create(payload);
  
      res.status(200).json({
        state: true,
        msg: `New Operation to add (${operation.ops}) to Supplier: (${supplierx.name}) to the year: ${year} - Created successfully`,
        data: operation,
      });
    }



    // let ops = await Operation.find({ops: "1st balance", supplier: req.body.supplier } );
    // if( ops.length > 0 ){
    //     console.log(ops);
    //     return next(new ErrorResponse("this supplier already have opening balance", 400));
                
    // } else {

    //     const supplierx = await Supplier.findById(req.body.supplier);



    //     let year = new Date().getFullYear();
    //     let payload = {


    //         supplier: req.body.supplier,
    //         supplierName: customerx.name,
    //         accounting: [
    //             {
    //                 id: req.body.supplier,
    //                 details: `${year} opening balance to supplier: ${supplierx.name}`,
    //                 credit: req.body.credit
    //             }
    //         ]
    //     };

    //     const operation = await Operation.create(payload);
    
    //     res.status(200).json({
    //         state: true,
    //         msg: `New operation to add (${operation.ops}) to supplier (${supplierx.name})   to the year: ${year} - Created successfully`,
    //         data: operation
    //     });
    // }
        
});



// @description update operation
// Rout PUT api/v1/operation/:id
//Access Private 
exports.updateOperation =  asyncHandler(async (req, res, next) => {

    let operation = await Operation.findById(req.params.id);
    let supplierx = await Supplier.findById(req.body.supplier);

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
     msg: `Operation ( ${operation.ops} ) to Supplier: (${supplierx.name}) Updated Successfully to be (${req.body.credit})`,


 }); 

    // let operation = await Operation.findById(req.params.id);

    // if (!operation) {
    //     return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    // }

    // let newoperation = await Operation.updateOne({_id: req.params.id, 'accounting.credit': operation.accounting[0].credit}, {$set: {"accounting.$.credit" : req.body.credit}}, {
    //     new: true,
    //     runValidators: true
    //  } );

    // const supplier = await Supplier.findById(operation.supplier);

    // res.status(200).json({
    //     state: true,
    //     msg: `Operation ( ${operation.ops} ) to supplier (${supplier.name}) Updated Successfully to be (${req.body.credit})`,


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