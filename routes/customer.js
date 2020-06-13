const express = require("express");
const router = express.Router();
const{getCustomers, postCustomer, getCustomer, updateCustomer, deleteCustomer} = require('../controllers/customer');

router.get("", getCustomers)
      .post("", postCustomer);


router.get("/:id", getCustomer)
      .put("/:id", updateCustomer)
      .delete("/:id", deleteCustomer);

module.exports = router