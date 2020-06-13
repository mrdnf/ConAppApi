const Customer = require('../models/Customer');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @description Get All Customers
// Rout GET api/v1/customers
//Access Public 
exports.getCustomers = asyncHandler(async (req, res, next) => {

    const customers = await Customer.find().sort({createdAt: -1});
    /* .populate('accounts') */;
    const customersCount = await Customer.countDocuments();

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        count: customersCount,
        data: customers
    });
});


// @description Get Single customer
// Rout GET api/v1/customer/:id
//Access Public 
exports.getCustomer = asyncHandler(async (req, res, next) => {

    await Customer.find({_id: req.params.id}
        ).populate('accounts').exec((err, customer)=>{
            let x=[];
            for (let y = 0; y < customer[0].accounts.length; y++) {
                for (let i = 0; i < customer[0].accounts[y].accounting.length; i++) {
                    if(JSON.stringify(customer[0]._id) == JSON.stringify(customer[0].accounts[y].accounting[i].id))  { x.push( customer[0].accounts[y].accounting[i]) } ;
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
                msg: 'Fetch Single customer Successfully',
                data: { name: customer[0].name, 
                        accounting: x,
                        credit: credits,
                        debit: debits,
                        balance: credits - debits
                }

        });
    });


});

// @description Creat New customer
// Rout POST api/v1/customers
//Access Private 
exports.postCustomer = asyncHandler(async (req, res, next) => {

    const customer = await Customer.create({name: req.body.name});

    res.status(200).json({
        state: true,
        msg:  `New customer - ${req.body.name} - Created successfully`,
        data: customer
    });
});




// @description Put an customer
// Rout PUT api/v1/customers/:id
//Access Private 
exports.updateCustomer = asyncHandler(async (req, res, next) => {

    let customer = await Customer.findById(req.params.id);

    if (!customer)  return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    
    customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true,  runValidators: true });

    res.status(200).json({
        state: true,
        msg: `Customer ( ${req.params.id} ) Updated Successfully`,
        data: customer
    });
});




// @description Delete an customer
// Rout DELETE api/v1/customers/:id
//Access Private 
exports.deleteCustomer = asyncHandler(async (req, res, next) => {

    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    
    res.status(201).json({ state: true,     msg: `Customer ( ${req.params.id} ) Deleted Successfully`});

});


