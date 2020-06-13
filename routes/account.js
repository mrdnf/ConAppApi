const express = require('express');
const router = express.Router();
const { getAccounts, getAccount, postAccount, updateAccount, deleteAccount } = require('../controllers/account');

router.route('').get(getAccounts)
                .post(postAccount);
router.route('/:id').get(getAccount)
                    .put(updateAccount)
                    .delete(deleteAccount);

module.exports = router;