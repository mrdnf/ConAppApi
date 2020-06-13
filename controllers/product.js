const Product = require('../models/Product');
const Supplier = require('../models/Customer');

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


// @description Get All Products
// Rout GET api/v1/product
//Access Public 
exports.getProducts = asyncHandler(async (req, res, next) => {

    const products = await Product.find().sort({createdAt: -1})
    //.populate('supplier')
    .populate({path: 'supplier', select: 'supplier -_id', populate: { path: 'supplier', select: 'name -_id' }})
    .populate("unit", "-_id");
    const productsCount = await Product.countDocuments();

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        count: productsCount,
        data: products
    });
});


// @description Get Single product
// Rout GET api/v1/product/:id
//Access Public 
exports.getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    .populate("unit", "-_id -__v -createdAt -updatedAt")
    .populate('supplier', "name") ;

    if (!product) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }
    res.status(200).json({
        state: true,
        msg: 'Fetch Single product Successfully',
        data: product
    });
});


// @description Creat New product
// Rout POST api/v1/product
//Access Private 
exports.postProduct = asyncHandler( async (req, res, next) => {
    const product = await Product.create({name: req.body.name, unit:req.body.unit});

    res.status(201).json({
        state: true,
        msg: `New product - ${req.body.name} - Created successfully`,
        data: product
        });
});


//      try {
//         Product.create(req.body, function (err, productData) {
//             if (err) res.status(400).json({ error: err });
//             if (!req.body.supplier) {
//                 res.status(201).json({
//                     state: true,
//                     msg: `New product - ${req.body.name} - Created successfully`,
//                     data: productData
//                 });
//             }
//             if (req.body.supplier) {
//                     for (var x = 0; x < req.body.supplier.length; x++) {
//                          Supplier.findById(req.body.supplier[x], (err, Supplierdata) => {
    
//                             productData.supplier.push(Supplierdata._id);


//                                 Supplier.findOneAndUpdate({_id: Supplierdata._id}, { $addToSet: { product:  productData._id  } }, {new: true},(err, data)=>{
//                                     let supplier = data;
//                                     if(err) console.log(err);
//                                     supplier.save();
//                                 });
                            

//                         });
    
//                 }
//                             res.status(201).json({
//                             state: true,
//                             msg: `New product - ${req.body.name} - Created successfully`,
//                             data: productData
//                             });
//             }
    
//         });
//     } catch (err) {
//         if (err) res.status(400).json({ error: err });
    
//     }




// }); 














// @description update Product
// Rout PUT api/v1/product/:id
//Access Private 
exports.updateProduct =  asyncHandler( async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        state: true,
        msg: `product ( ${req.params.id} ) Updated Successfully`,
        data: product
    });


    // try {
    //     Product.findByIdAndUpdate(req.params.id, req.body, {new: true},function (err, productData) {
    //         if (err) res.status(400).json({ error: err });
    //         if (!req.body.supplier) {
    //             res.status(201).json({
    //                 state: true,
    //                 msg: `New product - ${req.body.name} - Updated successfully`,
    //                 data: productData
    //             });
    //         }
    //         if (req.body.supplier) {


               

    //             delete  productData.supplier;


    //                 for (var x = 0; x < req.body.supplier.length; x++) {
    //                      Supplier.findById(req.body.supplier[x], (err, Supplierdata) => {
                            
    //                         productData.supplier.push(Supplierdata._id);

                        
    //                             Supplier.findOneAndUpdate({_id: Supplierdata._id}, {  $unset:  {product:""}, $push: {product: productData._id} } , {new: true}, (err, data)=>{
                                  
    //                                 let supplier = data;
    //                                 if(err) console.log(err);
    //                                 supplier.save();
    //                             });
                            

    //                     });
    
    //             }
    //                         res.status(201).json({
    //                         state: true,
    //                         msg: `New product - ${req.body.name} - Created successfully`,
    //                         data: productData
    //                         });
    //         }
    
    //     });
    // } catch (err) {
    //     if (err) res.status(400).json({ error: err });
    
    // }

});



// @description Delete Product
// Rout DELETE api/v1/product/:id
//Access Private 
exports.deleteProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    res.status(201).json({
        state: true,
        msg: `Product ( ${req.params.id} ) Deleted Successfully`,
    });
});