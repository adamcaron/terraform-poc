var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/create', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json(req.body.terraformConfig)
});

module.exports = router;
