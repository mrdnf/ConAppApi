const Bank = require('../models/Bank');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @description Get All Banks
// Rout GET api/v1/bank
//Access Public 
exports.getBanks = asyncHandler(async (req, res, next) => {

    const banks = await Bank.find().sort({createdAt: -1});
    const banksCount = await Bank.countDocuments();

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        count: banksCount,
        data: banks
    });
});


// @description Get Single Bank
// Rout GET api/v1/bank/:id
//Access Public 
exports.getBank = asyncHandler(async (req, res, next) => {
  
    await Bank.find({_id: req.params.id}
        ).populate('accounts').exec((err, bank)=>{
            let x=[];
            for (let y = 0; y < bank[0].accounts.length; y++) {
                for (let i = 0; i < bank[0].accounts[y].accounting.length; i++) {
                    if(JSON.stringify(bank[0]._id) == JSON.stringify(bank[0].accounts[y].accounting[i].id))  { x.push( bank[0].accounts[y].accounting[i]) } ;
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
                msg: 'Fetch Single bank Successfully',
                data: { 
                    name: bank[0].name, 
                    accounting: x,
                    credit: credits,
                    debit: debits,
                    balance: credits - debits
                }

        });
    });
});

// @description Creat New Bank
// Rout POST api/v1/bank
//Access Private 
exports.postBank = asyncHandler(async (req, res, next) => {

    const bank = await Bank.create({name: req.body.name});

    res.status(200).json({
        state: true,
        msg: `New Bank - ${req.body.name} - Created successfully`,
        data: bank
    });
});

// @description Put an Bank
// Rout PUT api/v1/bank/:id
//Access Private 
exports.updateBank = asyncHandler(async (req, res, next) => {

    let bank = await Bank.findById(req.params.id);

    if (!bank) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    bank = await Bank.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        state: true,
        msg: `Bank ( ${req.params.id} ) Updated Successfully`,
        data: bank
    });
});

// @description Delete A Bank
// Rout DELETE api/v1/bank/:id
//Access Private 
exports.deleteBank = asyncHandler(async (req, res, next) => {

    const bank = await Bank.findByIdAndDelete(req.params.id);

    if (!bank) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    res.status(201).json({
        state: true,
        msg: `Bank ( ${req.params.id} ) Deleted Successfully`,
    });
});