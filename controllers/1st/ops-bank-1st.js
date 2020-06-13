const Operation = require("../../models/1st/Ops-bank-1st");
const Bank = require("../../models/Bank");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");

// @description Get All acconts
// Rout GET api/v1/operation
//Access Public
exports.getOperations = asyncHandler(async (req, res, next) => {
  let query = {
    ops: "1st balance",
    bank: { $exists: true },
  };

  const operations = await Operation.find(query).sort({ createdAt: -1 });

  let operationsCount = await Operation.find(query).countDocuments();

  res.status(200).json({
    state: true,
    msg: "Get All Resource Data From Database",
    count: operationsCount,
    data: operations,
  });
});

// @description Get Single operation
// Rout GET api/v1/operation/:id
//Access Public
exports.getOperation = asyncHandler(async (req, res, next) => {
  const operation = await Operation.findOne({
    _id: req.params.id,
    ops: "1st balance",
    bank: { $exists: true },
  });

  if (!operation) {
    return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
  }
  res.status(200).json({
    state: true,
    msg: "Fetch Single operation Successfully",
    data: operation,
  });
});

exports.postOperation = asyncHandler(async (req, res, next) => {



  let ops = await Operation.find({ ops: "1st balance", bank: req.body.bank });
  if (ops.length > 0) {
    return next(
      new ErrorResponse("this bank already have opening balance", 400)
    );
  } else {
    const bankx = await Bank.findById(req.body.bank);
    let year = new Date().getFullYear();
    let payload;
    if (req.body.credit) {
      payload = {
        bank: req.body.bank,
        bankName: bankx.name,
        total: req.body.total,
        accounting: [
          {
            id: req.body.bank,
            details: `${year} Opening balance to Bank: ${bankx.name}`,
            credit: req.body.total,
            debit: 0,
          },
        ],
      };
    } else {
      payload = {
        bank: req.body.bank,
        bankName: bankx.name,
        total: req.body.total,
        accounting: [
          {
            id: req.body.bank,
            details: `${year} Opening balance to Bank: ${bankx.name}`,
            credit: 0,
            debit: req.body.total,
          },
        ],
      };
    }

    const operation = await Operation.create(payload);

    res.status(200).json({
      state: true,
      msg: `New Operation to add (${operation.ops}) to Bank: (${bankx.name}) to the year: ${year} - Created successfully`,
      data: operation,
    });
  }










});

// @description update operation
// Rout PUT api/v1/operation/:id
//Access Private
exports.updateOperation = asyncHandler(async (req, res, next) => {


  
       let operation = await Operation.findById(req.params.id);
       let bankx = await Bank.findById(req.body.bank);

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
        msg: `Operation ( ${operation.ops} ) to bank (${bankx.name}) Updated Successfully to be (${req.body.credit})`,

 
    }); 

//   let replacement;
//   const bankx = await Bank.findById(req.body.bank);
//   let ops = await Operation.find({ ops: "1st balance", bank: req.body.bank });

//   if (req.body.bank !== ops.bank) {
//     if (req.body.credit) {
//       replacement = {
//         $set: {
//           bank: req.body.bank,
//           "accounting[0]credit": req.body.total,
//           "accounting[0].debit": 0,
//         },
//       };
//     } else {
//       replacement = {
//         $set: {
//           bank: req.body.bank,
//           "accounting[0].credit": 0,
//           "accounting[0].debit": req.body.total,
//         },
//       };
//     }
//   } else {
//     if (req.body.credit) {
//       replacement = {
//         $set: {
//           "accounting[0].credit": req.body.total,
//           "accounting[0].debit": 0,
//         },
//       };
//     } else {
//       replacement = {
//         $set: {
//           "accounting[0].credit": 0,
//           "accounting[0].debit": req.body.total,
//         },
//       };
//     }
//   }
//   let filter = { _id: req.params._id };

//   let options = { new: true };
//   //update
//   let operation = await Operation.findOneAndUpdate(
//     filter,
//     replacement,
//     options
//   );
//   res.status(200).json({
//     state: true,
//     msg: ` Operation updated successfully`,
//     data: operation,
//   });
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
