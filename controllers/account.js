const Account = require('../models/Account');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


// @description Get All acconts
// Rout GET api/v1/account
//Access Public 
exports.getAccounts =  asyncHandler(async (req, res, next) => {

    const accounts = await Account.find();
    const accountsCount = await Account.countDocuments();

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        count: accountsCount,
        data: accounts
    });
});


// @description Get Single account
// Rout GET api/v1/account/:id
//Access Public 
exports.getAccount = asyncHandler(async (req, res, next) => {
    const account = await Account.findById(req.params.id);

    if (!account) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }
    res.status(200).json({
        state: true,
        msg: 'Fetch Single account Successfully',
        data: account
    });
});


exports.postAccount =  asyncHandler(async (req, res, next) => {

    const account = await Account.create(req.body);

    res.status(200).json({
        state: true,
        msg: `New account - ${req.body.name} - Created successfully`,
        data: account
    });
});

// @description update account
// Rout PUT api/v1/account/:id
//Access Private 
exports.updateAccount =  asyncHandler(async (req, res, next) => {

    let account = await Account.findById(req.params.id);

    if (!account) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    bank = await Account.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        state: true,
        msg: `Account ( ${req.params.id} ) Updated Successfully`,
        data: account
    });
});


// @description Delete account
// Rout DELETE api/v1/account/:id
//Access Private 
exports.deleteAccount = asyncHandler(async (req, res, next) => {

    const account = await Account.findByIdAndDelete(req.params.id);

    if (!account) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    res.status(201).json({
        state: true,
        msg: `Account ( ${req.params.id} ) Deleted Successfully`,
    });
});