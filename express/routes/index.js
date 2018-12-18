var express = require('express');
var router = express.Router();
// 生成随机ID
var UUID = require('uuid');
var ID = UUID.v1();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
