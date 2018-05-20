/*
 * @Author: ChangerHe 
 * @Date: 2018-05-17 23:26:21 
 * @Last Modified by: ChangerHe
 * @Last Modified time: 2018-05-20 18:27:32
 */

var express = require('express');
var {User} = require('../models/index')
var router = express.Router();

router.get('/', async (req, res, next) => {
  const user = await User.findOne()
  console.log(user, 'user')
  res.json(user)
});

router.get('/home', function(req, res, next) {
  res.render('index', {title: 'test'})
})

module.exports = router;
