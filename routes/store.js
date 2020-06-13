const express = require('express');
const router = express.Router({mergeParams: true});
const { getStores, getStoresPlus, getStore, postStore, updateStore, deleteStore } = require('../controllers/store');

router.route('').get(getStores)
                .post(postStore);

router.route('/report').get(getStoresPlus);


router.route('/:id').get(getStore)
                    .put(updateStore)
                    .delete(deleteStore);

module.exports = router;
