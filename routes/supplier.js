const express = require("express");
const router = express.Router();
const{getSuppliers, postSupplier, getSupplier, updateSupplier, deleteSupplier} = require('../controllers/supplier');

router.get("", getSuppliers)
      .post("", postSupplier);


router.get("/:id", getSupplier)
      .put("/:id", updateSupplier)
      .delete("/:id", deleteSupplier);

module.exports = router