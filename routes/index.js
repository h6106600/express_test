var express = require('express');
var router = express.Router();
var article = require('../models/article.js');
var user = require('../models/user.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  article.find_article(function(result){
    if(req.session.name){
      res.render('index',{title:'首頁',article:result,user:true});
      return ;
    };
    res.render('index',{title:'首頁',article:result,user:false});
  });
});
router.post('/post',function(req,res,next){
  var nowDate = new Date();
  var t = nowDate.toLocaleDateString() + " "+ nowDate.toLocaleTimeString();
  article.insert_article(req.session.name,req.body.article,t);
  res.redirect('/');
});
router.get('/logout', function(req, res, next) {
  req.session.name=null;
  res.redirect('/');
});
router.get('/login', function(req, res, next) {
    if(req.session.name && req.cookies.name){	
	  res.render('login',{title:'登入',user:true,username:req.cookies.name});//登入成功
    }else if(req.cookies.name){
      res.render('login',{title:'登入',user:false,username:req.cookies.name});//之前登入成功
    }else{
	  res.render('login',{title:'登入',user:false,username:null});//未登入過或太久未登入	
	}
});
router.post('/check', function(req, res, next) {
  user.check_user(req.body.name,function(result){
    if(result != ''){
        res.send("用戶名已有人使用");
    }else{
        res.send("用戶名可以使用");
    }
  });
});
router.post('/login', function(req, res, next) {
  user.check2_user(req.body.name,req.body.password,function(result){
    if(result == ''){
      res.render('login',{title:'登入錯誤',user:false});
    }else{
	  res.cookie('name', req.body.name, {maxAge: 60 * 1000 * 60 * 24});//設置cookie (名稱,值,時間)	
      req.session.name=req.body.name;
      res.redirect('/login');
    }
  });
});

router.get('/reg', function(req, res, next) {
  if(req.session.name){
    //res.render('reg',{title:'註冊',user:true});
    res.redirect('/');//登入成功往首頁
  }else{
    res.render('reg',{title:'註冊',user:false});
  }
});
router.post('/reg', function(req, res, next) {
  req.session.name=req.body.name;
  user.insert_user(req.body.name,req.body.password,req.body.email);
  res.redirect('/reg');
});
router.get('/userData',function(req,res,next){
  user.display_user(function(result){
    if(result == ''){
      res.render('userData',{title:'用戶資料',user:true,userData:''});
    }else{
      res.render('userData',{title:'用戶資料',user:true,userData:result});
    }
  })
})
router.post('/delete',function(req,res,next){
  user.delete_user(req.body.name);
  res.send('已刪除用戶'+req.body.name);
})
router.get('/mongodb',function(req,res){
  if(req.session.name){
    res.render('mongodb',{title:'mongodb',user:true});
  }else{
    res.render('mongodb',{title:'mongodb',user:false});
  }
})
router.get('/redis',function(req,res,next){
  if(req.session.name){
    res.render('redis',{title:'redis',user:true});
  }else{
    res.render('redis',{title:'redis',user:false});
  }
})

router.get('/contact',function(req,res,next){
	res.sendFile(__dirname+'/contact.html');
})
router.post('/contact',function(req,res,next){
	var fs = require('fs');
	fs.appendFile(__dirname+'/contact.html', '名子:'+ req.body.name+ '信箱:' + req.body.email + '內容:' + req.body.content + "<br />", function (err) {
	  if (err) throw err;
	  console.log('appendData');
	});
	res.redirect('/contact');
})

module.exports = router;
