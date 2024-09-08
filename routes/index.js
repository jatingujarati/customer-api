var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/customer', require("./customer"));

module.exports = router;
