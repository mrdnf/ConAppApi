const express = require('express');
const router = express.Router();
const { getOperations, getOperation, postOperation, updateOperation, deleteOperation } = require('../controllers/ops-1st-balance');

router.route('').get(getOperations)
                .post(postOperation);
router.route('/:id').get(getOperation)
                    .put(updateOperation)
                    .delete(deleteOperation);

module.exports = router;