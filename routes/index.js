/*
 * @Author: ChangerHe 
 * @Date: 2018-05-17 23:26:21 
 * @Last Modified by: ChangerHe
 * @Last Modified time: 2018-05-21 13:13:08
 */

var express = require('express');
var {User, Test} = require('../models/index')
var router = express.Router();

router.get('/', async (req, res, next) => {
  // const user = await User.findOne()
  const user = await User.findById('4b67b598-a5f9-4401-a04a-31505a2dccc2')
  const test = await Test.findOne()
  console.log(user, 'user', test, 'test')
  res.json(test)
});

router.get('/home', function(req, res, next) {
  res.render('index', {title: 'test'})
})

module.exports = router;
