const express = require("express");
const router = express.Router();
const{postBranch} = require('../../controllers/branch/branch');

router.post("", postBranch);
      
module.exports = router;

