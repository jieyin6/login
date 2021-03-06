var express = require('express');
var router = express.Router();
var UserModel = require('../database/models/user.js')
router.get('/info', function (req, res) {
  let userid = req.cookies.userid
  console.log(userid)
  if (!userid) {
    return res.json({
      status: '10',
      msg: '当前没有userid'
    })
  }
  UserModel.findOne({_id: userid}, function (err, doc) {
    console.log(doc)
    if (err) {
      return res.json({
        status: '1',
        msg: '后端错误'
      })
    } else {
      if (doc) {
        return res.json({
          status: '0',
          data: doc,
          msg: '查找成功'
        })
      }
    }
  })
})
router.post('/login', function (req, res, next) {
  console.log(req)
  let user = req.body.user
  let pwd = req.body.pwd
  console.log(user, pwd)
  UserModel.findOne({user: user, pwd: pwd}, function (err, doc) {
    console.log(doc)
    if (!doc) {
      return res.json({
        status: '1',
        message: "用户名或密码错误"
      })
    } else {
      if (doc) {
        res.cookie('userid', doc._id)
        res.json({
          status: '0',
          data: doc,
          message: '登录成功'
        })
      }
    }
  })
})
/*
router.get('/isnamed', function (req, res, next) {
  let user = req.body.user
  UserModel.findOne({user: user}, function (err, doc) {
    if (doc) {
      res.json({
        status: '1',
        message: '用户名已被注册'
      })
    } else {
        res.json({
          status: '0',
          message: '该用户名可以使用'
        })
      }
  })
})*/

router.post('/register', function (req, res, next) {
  console.log('/register')
  let {user, pwd, radio} = req.body
  console.log(user, pwd)
  UserModel.findOne({user: user, pwd: pwd}, function (err, doc) {
    console.log(err, doc)
    if ( doc == null ) {
      let newuser = new UserModel({
        user: user,
        pwd: pwd,
        type: radio
      })
      newuser.save(function (err, doc) {
        if (err) {
          res.json({
            status: '1',
            message: '注册失败'
          })
        } else {
           res.json({
             status: '0',
             message: '注册成功',
             data: doc
           })
        }
      })
    } else {
      res.json({
        status: '10',
        message: '该用户名已被注册'
      })
    }
  })
})

router.post('/updateInfo', function (req, res, next) {
  console.log(req.body)
  let user = req.body.user
  UserModel.findOneAndUpdate({user: user}, req.body, function (err, doc) {
    console.log(err, doc)
    if (err) {
      res.json({
        status: '1',
        message: '更新失败'
      })
    } else {
      if (doc) {
        const data = Object.assign({}, doc, req.body)
        res.cookie('userid', doc._id)
        res.json({
          status: '0',
          data: data
        })
      }
    }
  })
})
//获取首页列表
router.get('/list', function (req, res) {
  let type = req.query.type
  console.log( 'type'+ type)
  UserModel.find({type: type}, function (err, doc) {
    console.log(doc)
    if (err) {
      return res.json({
        status: '1',
        msg: '获取列表失败'
      })
    } else {
      if (doc) {
        return res.json({
          status: '0',
          data: doc,
          msg: '获取列表成功'
        })
      }
    }
  })
})
module.exports = router;
