var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Convert Stuff' });
});

router.get('/order', function(req, res, next) {
  res.render('order', { title: 'New Order' });
});

module.exports = router;
