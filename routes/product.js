const express = require('express');
const { getProducts, getProduct, postProduct, updateProduct, deleteProduct } = require('../controllers/product');
const router = express.Router();

router.route('').get(getProducts)
                .post(postProduct);

router.route('/:id').get(getProduct)
                    .put(updateProduct)
                    .delete(deleteProduct);



module.exports = router;