var express = require('express');
var router = express.Router();
var resResult = require('./common/resResult');
var db = require('../models/index.js');
var config = require('../config/config.json');
let jwt = require("jsonwebtoken");
let cookie = require("cookie");
var Sequelize = require('sequelize');

// 간맥 페이지로 이동
router.get('/', async function(req, res) {
  let cookies = (req.headers.cookie !== undefined) ? cookie.parse(req.headers.cookie) : '';
  try{
    if(cookies.user){
      let list = await db.about_ganmack.findAll({
        limit:10, 
        order: [
          ['no','desc']
        ]
      });
      res.render('main',{list:list});
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

        await db.user.update(
        {
          last_login_date : Sequelize.fn('now'),
          token : token
        },
        {
          where: {
            id: id
          }
        });

        res.cookie("user", token).status(200).send(resResult(true, 200, "", {id:user.id}));
    }else{
      res.status(200).send(resResult(false, 400, "로그인안됨", "오지마세여"));
    }
  
  } catch (err) {
    throw err;
  }
});

// 어바웃 간맥 한줄쓰기
router.post('/aboutGanmack',async function(req, res) {
  let user_token = (req.headers.cookie.split('=')[0]=="user") ? req.headers.cookie.split('=')[1] : '';
  let {nickname, content} = req.body;
  
  try{
    let user = await db.user.findOne({
      attributes : [
        'no',
      ],
      where: {
        token : user_token
      }
    })

    await db.about_ganmack.create({
      nickname : nickname,
      content : content,
      user_no : user.no
    })
    
    res.status(200).send(resResult(true, 200, "", ""));
  
  } catch (err) {
    throw err;
  }
});


module.exports = router;
