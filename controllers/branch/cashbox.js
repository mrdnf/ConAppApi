const Cashbox = require('../../models/Cashbox');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

// @description Get All Cashboxes
// Rout GET api/v1/cashbox
//Access Public 
exports.getCashboxes = asyncHandler(async (req, res, next) => {


    
    const cashboxes = await Cashbox.find().sort({createdAt: -1});
    const cashboxesCount = await Cashbox.countDocuments();

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        count: cashboxesCount,
        data: cashboxes
    }); 


});


// @description Get Single Cashbox
// Rout GET api/v1/cashbox/:id
//Access Public 
exports.getCashbox = asyncHandler(async (req, res, next) => {

      await Cashbox.find({_id: req.params.id}
    ).populate('accounts').exec((err, cashbox)=>{
        let x=[];
        for (let y = 0; y < cashbox[0].accounts.length; y++) {
            for (let i = 0; i < cashbox[0].accounts[y].accounting.length; i++) {
                if(JSON.stringify(cashbox[0]._id) == JSON.stringify(cashbox[0].accounts[y].accounting[i].id))  { x.push( cashbox[0].accounts[y].accounting[i]) } ;
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
            msg: 'Fetch Single cashbox Successfully',
            data: { 
                name: cashbox[0].name, 
                accounting: x,
                credit: credits,
                debit: debits,
                balance: credits - debits
            }

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

