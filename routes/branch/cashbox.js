const express = require("express");
const router = express.Router();
const{getCashboxes, postCashbox, getCashbox, ubdateCashbox, deleteCashbox} = require('../../controllers/branch/cashbox');

router.get("", getCashboxes)
      .post("", postCashbox);


router.get("/:id", getCashbox)
      .put("/:id", ubdateCashbox)
      .delete("/:id", deleteCashbox);

module.exports = router