const Cashbox = require('../../models/Cashbox');
const Store = require('../../models/Store');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');




// @description Creat New branch
// Rout POST api/v1/branch
//Access Private 
exports.postBranch = asyncHandler(async (req, res, next) => {
 
    const store = await Store.findOne(req.body);
    const cash = await Cashbox.findOne(req.body);

    if (store && cash ) {
    
        return next(new ErrorResponse(`Please Choose Another Name, Duplicated Value Detected`, 400));

    }else{

    const store = await Store.create(req.body);
    const cashbox = await Cashbox.create(req.body);

    res.status(200).json({
        state: true,
        msg: `New Branch - ${req.body.name} - Created successfully`,
        BranchStoreDetails: store,
        BranchCashBoxDetails: cashbox,
    });
}

});