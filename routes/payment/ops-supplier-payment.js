const express = require('express');
const router = express.Router();
const { getOperations, getOperationsc, getOperationsb, getOperation, postOperation, updateOperation, deleteOperation } = require('../../controllers/payment/ops-supplier-payment');



router.route('/')   .get(getOperations)
                    .post(postOperation);


router.route('/:id').put(updateOperation)
                    .get(getOperation)
                    .delete(deleteOperation);



router.route('/bank').get(getOperationsb);                    
router.route('/cash').get(getOperationsc);








// router.route('/')   .get(getOperations)
//                     .post(postOperation);
// router.route('/:id').put(updateOperation);
// router.route('/:id').get(getOperation)
//                     .delete(deleteOperation);

module.exports = router;