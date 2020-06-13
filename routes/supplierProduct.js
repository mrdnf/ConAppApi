const express = require('express');
const router = express.Router();
const { getSupplierProducts, getSupplierProduct, postSupplierProduct, updateSupplierProduct, deleteSupplierProduct } = require('../controllers/supplierProduct');

router.route('').get(getSupplierProducts)
                .post(postSupplierProduct);
router.route('/:id').get(getSupplierProduct)
                    .put(updateSupplierProduct)
                    .delete(deleteSupplierProduct);

module.exports = router;
