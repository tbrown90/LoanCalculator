var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { appName: "LoanCalculator", title: "Loan Calculator" });
});

module.exports = router;
