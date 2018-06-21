var express = require('express');
var router = express.Router();
var UserModel = require('../database/models/user.js')
//var util = require('utility')
//var _filter = {'pwd': 0, '_v': 0}
/* GET users listing. */
router.get('/login', function(req, res, next) {
  console.log(111)
  let param = {
    username: req.user,
    password: req.pwd
  }
  UserModel.findOne(param, function(err, doc){
    if(!doc) {
      return res.json({
        status:'1',
        message:"用户名或密码错误"
      })
    } else {
      if(doc) {
        res.cookie('user', doc.user, {
          path:'/',
          maxAge:1000 * 60 * 60
        })
        res.json({
          status:'0',
          data:doc.user,
          message:'登录成功'
        })
      }
    }
  })
})

router.get('/isnamed', function (req, res, next){
  let user = req.body.user
  UserModel.findOne({user:user}, function (err, doc) {
    if (doc) {
      res.json({
        status:'1',
        message:'用户名已被注册'
      })
    } else {
        res.json({
          status:'0',
          message:'该用户名可以使用'
        })
      }
    
  })
})

router.post('/register', function (req, res, next) {
  console.log('/register')
  
})

module.exports = router;
