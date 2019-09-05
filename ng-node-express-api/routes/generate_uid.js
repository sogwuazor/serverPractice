var uid = require('uid-safe');
var express = require('express');

var router = express.Router();


/* GET a guid. */
router.get('/', function(req, res, next)
{
  debugger;
  var strUid = uid.sync(18);

  res.json({guid: strUid});
});

module.exports = router;
