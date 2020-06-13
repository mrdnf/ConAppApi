const Store = require('../models/Store');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async')

// @description Get All Stores (view stores names only)
// Rout GET api/v1/store
//Access Public 
exports.getStores = asyncHandler(async (req, res, next) => {

  const stores = await Store.find().sort({createdAt: -1});
  const storesCount = await Store.countDocuments();

  res.status(200).json({
      state: true,
      msg: 'Get All Resource Data From Database',
      count: storesCount,
      data: stores
  });
});


// @description Get All Stores (view stores with its balance)
// Rout GET api/v1/store
//Access Public 
exports.getStoresPlus = asyncHandler(async (req, res, next) => {

  const stores = await Store.find()
                             /* .populate('balance') */;
  const storesCount = await Store.countDocuments();

  res.status(200).json({
      state: true,
      msg: 'Get All Resource Data From Database',
      count: storesCount,
      data: stores
  });
});

// @description Get Single Store
// Rout GET api/v1/store/:id
//Access Public 
exports.getStore = asyncHandler(async (req, res, next) => {
    const store = await Store.findById(req.params.id)
    .populate('balance');

    if (!store) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }
    res.status(200).json({
        state: true,
        msg: 'Fetch Single Store Successfully',
        data: store
    });
});

// @description Creat New Store
// Rout POST api/v1/store
//Access Private 
exports.postStore = asyncHandler(async (req, res, next) => {

    const store = await Store.create({name: req.body.name});

    res.status(200).json({
        state: true,
        msg: `New Store - ${req.body.name} - Created successfully`,
        data: store
    });
});

// @description Put an Store
// Rout PUT api/v1/store/:id
//Access Private 
exports.updateStore = asyncHandler(async (req, res, next) => {

    let store = await Store.findById(req.params.id);

    if (!store) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    store = await Store.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        state: true,
        msg: `Store ( ${req.params.id} ) Updated Successfully`,
        data: store
    });
});

// @description Delete A Store
// Rout DELETE api/v1/store/:id
//Access Private 
exports.deleteStore = asyncHandler(async (req, res, next) => {

    const store = await Store.findByIdAndDelete(req.params.id);

    if (!store) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    res.status(201).json({
        state: true,
        msg: `Store ( ${req.params.id} ) Deleted Successfully`,
    });
});