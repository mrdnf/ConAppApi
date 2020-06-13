const express = require('express');
const router = express.Router();
const { getStoreBalances, getStoreBalance, addStoreBalance, subStoreBalance } = require('../controllers/storeBalance');

router.route('').get(getStoreBalances);
router.route('/add').post(addStoreBalance);
router.route('/:id').get(getStoreBalance)
router.route('/sub').delete(subStoreBalance);

module.exports = router;
