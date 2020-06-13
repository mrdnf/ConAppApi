const express = require('express');
const router = express.Router();
const { getOperations, getOperation, postOperation, updateOperation, deleteOperation, deleteAllOperation } = require('../controllers/operation');

router.route('').get(getOperations)
                .post(postOperation)
                .delete(deleteAllOperation);
router.route('/:id').get(getOperation)
                    .put(updateOperation)
                    .delete(deleteOperation);

module.exports = router;