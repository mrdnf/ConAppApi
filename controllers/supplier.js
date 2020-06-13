const Supplier = require('../models/Supplier');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @description Get All Suppliers
// Rout GET api/v1/suppliers
//Access Public 
exports.getSuppliers = asyncHandler(async (req, res, next) => {

    const suppliers = await Supplier.find().sort({createdAt: -1});
/*     .populate({path: 'product', select: '-_id -createdAt -updatedAt -__v', populate: { path: 'product', select: 'name -_id' }})
 */    //.populate({path: 'product', select: '-_id name'}).populate('accounts')
    ;
    const suppliersCount = suppliers.length;

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        count: suppliersCount,
        data: suppliers
    });
});


// @description Get Single supplier
// Rout GET api/v1/dealer/:id
//Access Public 
exports.getSupplier = asyncHandler(async (req, res, next) => {


    await Supplier.find({_id: req.params.id}
        ).populate('accounts').exec((err, supplier)=>{
            let x=[];
            for (let y = 0; y < supplier[0].accounts.length; y++) {
                for (let i = 0; i < supplier[0].accounts[y].accounting.length; i++) {
                    if(JSON.stringify(supplier[0]._id) == JSON.stringify(supplier[0].accounts[y].accounting[i].id))  { x.push( supplier[0].accounts[y].accounting[i]) } ;
                }   
            }
    
    ////////////////////////////////////////////////////////////////////////////////////
            let  credits = 0, debits = 0;
             var Credits = () => {
                for (let z = 0; z < x.length; z++) {
                    var One =  x[z], Two = [];
                    Two.push(One.credit);
                    let three = Two.reduce(function(acc, val) { return acc + val; }, 0);
                    credits += three;
                }
            }
            
            Credits();
    /////////////////////////////////////////////////////////////////////////////////////
    
            var Debits = () => {
            for (let z = 0; z < x.length; z++) {
                var One =  x[z], Two = [];
                Two.push(One.debit);
                let three = Two.reduce(function(acc, val) { return acc + val; }, 0);
                debits += three;
            }
            }
    
            Debits();
            
          
            
             
            res.status(200).json({
                state: true,
                msg: 'Fetch Single supplier Successfully',
                data: { 
                        name: supplier[0].name,
                        accounting: x,
                        credit: credits,
                        debit: debits,
                        balance: credits - debits
                    
                    }

        });
    });


});

// @description Creat New supplier
// Rout POST api/v1/suppliers
//Access Private 
exports.postSupplier = asyncHandler(async (req, res, next) => {

    const supplier = await Supplier.create({name: req.body.name});


    res.status(200).json({
        state: true,
        msg:  `New supplier - ${req.body.name} - Created successfully`,
        data: supplier
    });
});

// @description Put an supplier
// Rout PUT api/v1/suppliers/:id
//Access Private 
exports.updateSupplier = asyncHandler(async (req, res, next) => {

    let supplier = await Supplier.findById(req.params.id);

    if (!supplier) return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    

    supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        state: true,
        msg: `Supplier ( ${req.params.id} ) Updated Successfully`,
        data: supplier
    });
});

// @description Delete an supplier
// Rout DELETE api/v1/suppliers/:id
//Access Private 
exports.deleteSupplier = asyncHandler(async (req, res, next) => {

    const supplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!supplier) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    res.status(201).json({
        state: true,
        msg: `Supplier ( ${req.params.id} ) Deleted Successfully`,

    });
});


