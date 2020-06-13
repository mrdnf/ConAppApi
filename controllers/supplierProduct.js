const SupplierProduct = require("../models/SupplierProduct");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @description Get All SupplierProducts
// Rout GET api/v1/storeBalance
//Access Public
exports.getSupplierProducts = asyncHandler(async (req, res, next) => {
  const supplierProducts = await SupplierProduct.find().sort({ createdAt: -1 });
  /*     .populate('supplier').populate('product');*/

  const supplierProductsCount = await SupplierProduct.countDocuments();
  var newSuppProd = [];
  for (let x = 0; x < supplierProducts.length; x++) {
    var prox = await Product.findById(supplierProducts[x].product);
    var supplx = await Supplier.findById(supplierProducts[x].supplier);
    newSuppProd.push({
      _id: supplierProducts[x]._id,
      supplier: supplierProducts[x].supplier,
      supplierName: supplx.name,
      product: supplierProducts[x].product,
      productName: prox.name,
      createdAt: supplierProducts[x].createdAt,
      updatedAt: supplierProducts[x].updatedAt
    });
  }
  res.status(200).json({
    state: true,
    msg: "Get All Resource Data From Database",
    count: supplierProductsCount,
    data: newSuppProd
  });
});

// @description Get Single SupplierProduct
// Rout GET api/v1/storeBalance/:id
//Access Public
exports.getSupplierProduct = asyncHandler(async (req, res, next) => {
  const storeBalance = await SupplierProduct.findById(req.params.id)
    .populate("supplier", "name -_id")
    .populate("product", "name -_id");

  if (!storeBalance) {
    return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
  }
  res.status(200).json({
    state: true,
    msg: "Fetch Single SupplierProduct Successfully",
    data: storeBalance
  });
});

// @description Creat New SupplierProduct
// Rout POST api/v1/storeBalance
//Access Private
exports.postSupplierProduct = asyncHandler(async (req, res, next) => {
  const storeBalance = await SupplierProduct.create({supplier: req.body.supplier, product: req.body.product});

  res.status(200).json({
    state: true,
    msg: `New SupplierProduct - ${req.body.name} - Created successfully`,
    data: storeBalance
  });
});

// @description Put an SupplierProduct
// Rout PUT api/v1/storeBalance/:id
//Access Private
exports.updateSupplierProduct = asyncHandler(async (req, res, next) => {
  let storeBalance = await SupplierProduct.findById(req.params.id);

  if (!storeBalance) {
    return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
  }

  storeBalance = await SupplierProduct.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    state: true,
    msg: `SupplierProduct ( ${req.params.id} ) Updated Successfully`,
    data: storeBalance
  });
});

// @description Delete A SupplierProduct
// Rout DELETE api/v1/storeBalance/:id
//Access Private
exports.deleteSupplierProduct = asyncHandler(async (req, res, next) => {
  const storeBalance = await SupplierProduct.findByIdAndDelete(req.params.id);

  if (!storeBalance) {
    return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
  }

  res.status(201).json({
    state: true,
    msg: `SupplierProduct ( ${req.params.id} ) Deleted Successfully`
  });
});
