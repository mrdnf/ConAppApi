const express = require('express');
const router = express.Router();
const { getOperations, getOperation, postOperation, updateOperation, deleteOperation } = require('../../controllers/buy/ops-buy-cash');

router.route('').get(getOperations)
                .post(postOperation);
router.route('/:id').get(getOperation)
                    .put(updateOperation)
                    .delete(deleteOperation);

module.exports = router;