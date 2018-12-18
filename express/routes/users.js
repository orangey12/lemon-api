var express = require('express');
var router = express.Router();
var users = require("./users_api");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addUser', users.addUser);

module.exports = router;
