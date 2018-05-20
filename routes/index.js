/*
 * @Author: ChangerHe 
 * @Date: 2018-05-17 23:26:21 
 * @Last Modified by: ChangerHe
 * @Last Modified time: 2018-05-20 13:33:59
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('index', {title: 'test'})
})

module.exports = router;
