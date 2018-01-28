var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

res.json([{
  id: 1,
  username: "Matt"
}, {
  id: 2,
  username: "Nitin"
}]);
});

module.exports = router;
