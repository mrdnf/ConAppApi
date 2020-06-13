const express = require('express');
const router = express.Router();
const { getOperations, getOperationsc, getOperationsb, getOperation, postOperation, updateOperation, deleteOperation } = require('../../controllers/payment/ops-customer-payment');


router.route('/')   .get(getOperations)
                    .post(postOperation);


router.route('/:id').put(updateOperation)
                    .get(getOperation)
                    .delete(deleteOperation);



router.route('/ext/bank').get(getOperationsb);                    
router.route('/ext/cash').get(getOperationsc);


module.exports = router;