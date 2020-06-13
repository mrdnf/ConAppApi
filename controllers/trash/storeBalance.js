
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @description Get All StoreBalances
// Rout GET api/v1/storeBalance
//Access Public 
exports.getStoreBalances = asyncHandler(async (req, res, next) => {

    const storeBalances = await StoreBalance.find()
    .populate('store', 'name').populate('product', 'name');
    const storeBalancesCount = await StoreBalance.countDocuments();

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        count: storeBalancesCount,
        data: storeBalances
    });
});


// @description Get Single StoreBalance
// Rout GET api/v1/storeBalance/:id
//Access Public 
exports.getStoreBalance = asyncHandler(async (req, res, next) => {
    const storeBalance = await StoreBalance.findById(req.params.id)
    .populate('store', 'name').populate('product', 'name');

    if (!storeBalance) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }
    res.status(200).json({
        state: true,
        msg: 'Fetch Single StoreBalance Successfully',
        data: storeBalance
    });
});

// @description Creat New StoreBalance
// Rout POST api/v1/storeBalance/add
//Access Private 
exports.addStoreBalance = asyncHandler(async (req, res, next) => {
    const dup = await StoreBalance.findOne({store: req.body.store, product: req.body.product});
    if (!dup){
            const storeBalance = await StoreBalance.create(req.body);
            res.status(200).json({ state: true, msg: `New StoreBalance in store " ${req.body.store} "  with product " ${req.body.product} "  Created successfully`, data: storeBalance });
    }else{
        const storeBalance = await StoreBalance.findOneAndUpdate(
            {store: req.body.store, product: req.body.product},
            { $inc: { quantity: req.body.quantity}}, 
            {  new: true, runValidators: true });
            res.status(200).json({ state: true, msg: `New StoreBalance in store ( ${req.body.store} )  with product ( ${req.body.product} )  Updated successfully`, data: storeBalance });
    }

});



// @description Delete A StoreBalance
// Rout DELETE api/v1/storeBalance/sub
//Access Private 
exports.subStoreBalance = asyncHandler(async (req, res, next) => {

    let storeBalance = await StoreBalance.findOne({store: req.body.store, product: req.body.product});
         if (!storeBalance) { res.status(404).json({ state: false, msg: `No StoreBalance in that store " ${req.body.store} "  with product " ${req.body.product} "`, data: "" }); }
    else if ( storeBalance.quantity >= req.body.quantity ) {

                    if ( storeBalance.quantity > req.body.quantity ){
                                    let storeBalance = await StoreBalance.findOneAndUpdate(
                                    {store: req.body.store, product: req.body.product},
                                    { $inc: { quantity: -req.body.quantity}}, 
                                    {  new: true, runValidators: true });
                                    res.status(201).json({ state: true, msg: `New StoreBalance in store ( ${req.body.store} )  with product ( ${req.body.product} )  Updated successfully`, current_Balance: storeBalance.quantity });                     }
                        if ( storeBalance.quantity = req.body.quantity ){
                                     await StoreBalance.findOneAndDelete(
                                    {store: req.body.store, product: req.body.product});
                                    res.status(201).json({ state: true, msg: `New StoreBalance in store ( ${req.body.store} )  with product ( ${req.body.product} )  Updated successfully`, current_Balance: 0 });  
                                                                                                                                                                                                                                                            }


  } 

    else { 
        res.status(406).json({ state: false, msg: `incufitiont StoreBalance in store ( ${req.body.store} )  with product ( ${req.body.product} ).`}); 
    }
});