const express = require("express");
const router = express.Router();
const{getBanks, postBank, getBank, updateBank, deleteBank} = require('../controllers/bank');

router.get("", getBanks)
      .post("", postBank);
      
router.get("/:id", getBank)
      .put("/:id", updateBank)
      .delete("/:id", deleteBank);

module.exports = router