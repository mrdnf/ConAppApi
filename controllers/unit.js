const Unit = require('../models/Unit');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @description Get All Units
// Rout GET api/v1/unit
//Access Public 
exports.getUnits = asyncHandler(async (req, res, next) => {

    const units = await Unit.find().sort({createdAt: -1});
    const unitsCount = await Unit.countDocuments();

    res.status(200).json( res.advancedResults
        
/*     {
    state: true,
    msg: 'Get All Resource Data From Database',
    count: unitsCount,
    data: units
    } */
    
    
    );


});





// @description Get Single Unit
// Rout GET api/v1/unit/:id
//Access Public 
exports.getUnit = asyncHandler(async (req, res, next) => {
    const unit = await Unit.findById(req.params.id);

    if (!unit) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }
    res.status(200).json({
        state: true,
        msg: 'Fetch Single Unit Successfully',
        data: unit
    });
});














// @description Creat New Unit
// Rout POST api/v1/unit
//Access Private 
exports.postUnit = asyncHandler(async (req, res, next) => {

    const unit = await Unit.create({name: req.body.name, large: req.body.large, small: req.body.small, ratio: req.body.ratio});

    res.status(200).json({
        state: true,
        msg: `New Unit - ${req.body.name} - Created successfully`,
        data: unit
    });
});















// @description Put an Unit
// Rout PUT api/v1/unit/:id
//Access Private 
exports.updateUnit = asyncHandler(async (req, res, next) => {

    let unit = await Unit.findById(req.params.id);

    if (!unit) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    unit = await Unit.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        state: true,
        msg: `Unit ( ${req.params.id} ) Updated Successfully`,
        data: unit
    });
});

// @description Delete A Unit
// Rout DELETE api/v1/unit/:id
//Access Private 
exports.deleteUnit = asyncHandler(async (req, res, next) => {

    const unit = await Unit.findByIdAndDelete(req.params.id);

    if (!unit) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    res.status(201).json({
        state: true,
        msg: `Unit ( ${req.params.id} ) Deleted Successfully`,
    });
});