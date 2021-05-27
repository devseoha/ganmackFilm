var express = require('express');
var router = express.Router();
var resResult = require('./common/resResult');
var db = require('../models/index.js');
var config = require('../config/config.json');
let jwt = require("jsonwebtoken");
let cookie = require("cookie");

// 간맥 페이지로 이동
router.get('/', function(req, res) {
  let cookies = (req.headers.cookie !== undefined) ? cookie.parse(req.headers.cookie) : '';
  try{
    if(cookies.user){
      res.render('main');
    }else{
      res.render('login');
    }
  } catch (err) {
    throw err;
  }
});

// 로그인 api
router.post('/login',async function(req, res) {
  let {id,password} = req.body;
  try{
    let user = await db.user.findOne({
      attributes : [
        'id',
      ],
      where: {
        id: id,
        password : password
      }
    })
    
    if(user){
       let token = jwt.sign({
          id: id
        },
          config.jwt.secret ,
        {
          expiresIn: '5m'
        });
        res.cookie("user", token).status(200).send(resResult(true, 200, "", {id:user.id}));
    }else{
      res.status(200).send(resResult(false, 400, "로그인안됨", "오지마세여"));
    }
  
  } catch (err) {
    throw err;
  }
});
module.exports = router;
