const Cashbox = require('../models/Cashbox');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @description Get All Cashboxes
// Rout GET api/v1/cashbox
//Access Public 
exports.getCashboxes = asyncHandler(async (req, res, next) => {


    
    const Cashboxes = await Cashbox.find().sort({createdAt: -1});
    const CashboxesCount = await Cashbox.countDocuments();

     

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        count: CashboxesCount,
        data: Cashboxes
    });
});


// @description Get Single Cashbox
// Rout GET api/v1/cashbox/:id
//Access Public 
exports.getCashbox = asyncHandler(async (req, res, next) => {

      await Cashbox.find({_id: req.params.id}
    ).populate({path: 'accounts', match: {$elemMatch: { id: req.params.id}}}).exec((err, cashbox)=>{
        
        var Zero = cashbox[0].accounts, credits, debits;
////////////////////////////////////////////////////////////////////////////////////
         var Credits = () => {
            var One = [], Two = [];
            Zero.forEach(ele => { One.push(ele.accounting ); });
            One.forEach(x=>{ x.forEach(z=>{ Two.push(z.credit); }); });
            let credit = Two.reduce(function(acc, val) { return acc + val; }, 0);
            if (credit !== 'undefined') { credits = credit; }else{ credits = 0;}
        }
        
        Credits();
/////////////////////////////////////////////////////////////////////////////////////
        var Debits = () => {
            var One = [], Two = [], three = [];
            Zero.forEach(ele => { One.push(ele.accounting ); });
            One.forEach(x=>{ x.forEach(z=>{ Two.push(z.debit); }); });
            let debit = Two.reduce(function(acc, val) { return acc + val; }, 0);
            if (debit) { debits = debit; }else{ debits = 0;}
            for (let i = 0; i < cashbox[0].accounts.length; i++) { three.push(cashbox[0].accounts[i].accounting); }
            if (three) { threes = three; }else{ three = 0;}
        }
        
        Debits();


        res.status(200).json({
            state: true,
            msg: 'Fetch Single cashbox Successfully',
            data: { cashBoxName: cashbox[0].name, accounting: [ threes ]},
            credit: credits,
            debit: debits,
            balance: credits - debits
    });
});
});

// @description Creat New Cashbox
// Rout POST api/v1/cashbox
//Access Private 
exports.postCashbox = asyncHandler(async (req, res, next) => {

    const cashbox = await Cashbox.create({name: req.body.name});

    res.status(200).json({
        state: true,
        msg: `New cashbox - ${req.body.name} - Created successfully`,
        data: cashbox
    });
});

// @description Put an Cashbox
// Rout PUT api/v1/cashbox/:id
//Access Private 
exports.ubdateCashbox = asyncHandler(async (req, res, next) => {

    let cashbox = await Cashbox.findById(req.params.id);

    if (!cashbox) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    cashbox = await Cashbox.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        state: true,
        msg: `cashbox ( ${req.params.id} ) Updated Successfully`,
        data: cashbox
    });
});

// @description Delete cashbox
// Rout DELETE api/v1/cashbox/:id
//Access Private 
exports.deleteCashbox = asyncHandler(async (req, res, next) => {

    const cashbox = await Cashbox.findByIdAndDelete(req.params.id);

    if (!cashbox) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    res.status(201).json({
        state: true,
        msg: `Cashbox ( ${req.params.id} ) Deleted Successfully`,
    });
});

