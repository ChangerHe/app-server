/*
 * @Author: ChangerHe 
 * @Date: 2018-05-17 23:26:21 
 * @Last Modified by: ChangerHe
 * @Last Modified time: 2018-05-24 18:14:11
 */

var express = require('express');
var {User, Test} = require('../models/index')
var router = express.Router();

router.get('/db', async (req, res, next) => {
  // const user = await User.findOne()
  const user = await User.findById('4b67b598-a5f9-4401-a04a-31505a2dccc2')
  const test = await Test.findOne()
  console.log(user, 'user', test, 'test')
  res.json(test)
});

router.get('/home', function(req, res, next) {
  res.render('index', {title: 'test'})
})

router.get('/', function (req, res) {
  if (req.cookies.user == null) {
    res.render('signin', {title: 'test'})
  } else {
    res.render('index', {title: 'test'})
  }
});
router.get('/signin', function (req, res) {
  res.render('signin', {title: 'test'})
});
router.post('/signin', async function (req, res) {
  const user = await User.findAll({
    where: {
      nickname: req.body.name
    }
  })
  console.log(user, 'user')
  if (user.length) {
    //存在，则不允许登陆
    res.redirect('/signin');
  } else {
    //不存在，把用户名存入 cookie 并跳转到主页
    res.cookie("user", req.body.name, {maxAge: 1000*60*60*24*30});
    res.redirect('/');
  }
});

module.exports = router;
