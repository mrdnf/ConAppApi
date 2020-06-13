const Operation = require("../../models/1st/Ops-customer-1st");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const Customer = require("../../models/Customer");







 
// @description Get All acconts
// Rout GET api/v1/operation
//Access Public 
exports.getOperations =  asyncHandler(async (req, res, next) => {

    let query = { 
        ops: "1st balance" ,
        customer: { $exists: true },
    };

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
        ops: "1st balance" ,
        customer: { $exists: true },
    
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

// @description create operation
// Rout post api/v1/opscustomer1st/
//Access Private
exports.postOperation =  asyncHandler(async (req, res, next) => {


    let ops = await Operation.find({ ops: "1st balance", customer: req.body.customer });
    if (ops.length > 0) {
      return next(
        new ErrorResponse("this customer already have opening balance", 400)
      );
    } else {
      const customerx = await Customer.findById(req.body.customer);
      let year = new Date().getFullYear();
      let payload;
      if (req.body.credit) {
        payload = {
          customer: req.body.customer,
          customerName: customerx.name,
          total: req.body.total,
          accounting: [
            {
              id: req.body.customer,
              details: `${year} Opening balance to Customer: ${customerx.name}`,
              credit: req.body.total,
              debit: 0,
            },
          ],
        };
      } else {
        payload = {
          customer: req.body.customer,
          customerName: customerx.name,
          total: req.body.total,
          accounting: [
            {
              id: req.body.customer,
              details: `${year} Opening balance to Customer: ${customerx.name}`,
              credit: 0,
              debit: req.body.total,
            },
          ],
        };
      }
  
      const operation = await Operation.create(payload);
  
      res.status(200).json({
        state: true,
        msg: `New Operation to add (${operation.ops}) to Customer: (${customerx.name}) to the year: ${year} - Created successfully`,
        data: operation,
      });
    }


    // let ops = await Operation.find({ops: "1st balance", customer: req.body.customer } );
    // if( ops.length > 0 ){
    //     console.log(ops);
    //     return next(new ErrorResponse("this customer already have opening balance", 400));
                
    // } else {

    //     const customerx = await Customer.findById(req.body.customer);

    //     let year = new Date().getFullYear();
    //     let payload = {


    //         customer: req.body.customer,
    //         customerName: customerx.name,
    //         accounting: [
    //             {
    //                 id: req.body.customer,
    //                 details: `${year} opening balance to customer: ${customerx.name}`,
    //                 credit: req.body.credit
    //             }
    //         ]
    //     };

    //     const operation = await Operation.create(payload);
    
    //     res.status(200).json({
    //         state: true,
    //         msg: `New operation to add (${operation.ops}) to customer (${customerx.name})  to the year: ${year} - Created successfully`,
    //         data: operation
    //     });
    // }
        
});





// @description update operation
// Rout PUT api/v1/operation/:id
//Access Private 
exports.updateOperation =  asyncHandler(async (req, res, next) => {

    let operation = await Operation.findById(req.params.id);
    let customerx = await Customer.findById(req.body.customer);

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
     msg: `Operation ( ${operation.ops} ) to Customer: (${customerx.name}) Updated Successfully to be (${req.body.credit})`,


 }); 



    // let operation = await Operation.findById(req.params.id);

    // if (!operation) {
    //     return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    // }

    // let newoperation = await Operation.updateOne({_id: req.params.id, 'accounting.credit': operation.accounting[0].credit}, {$set: {"accounting.$.credit" : req.body.credit}}, {
    //     new: true,
    //     runValidators: true
    //  } );

    // const customer = await Customer.findById(operation.customer);

    // res.status(200).json({
    //     state: true,
    //     msg: `Operation ( ${operation.ops} ) to customer (${customer.name}) Updated Successfully to be (${req.body.credit})`,


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