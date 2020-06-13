const express = require("express");
const Unit = require('../models/Unit');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const{getUnits, postUnit, getUnit, updateUnit, deleteUnit} = require('../controllers/unit');

router.route('').get(advancedResults(Unit), getUnits)
                .post(postUnit);


router.route("/:id").get(getUnit)
                    .put(updateUnit)
                    .delete(deleteUnit);



module.exports = router;