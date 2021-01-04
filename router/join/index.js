var express = require('express');
var router = express.Router(); 
var path = require('path');
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//DATABASE SETTING
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'password',
    database : 'jsman'
});

connection.connect();


router.get('/', function(req, res){
    var meg;
    var errMsg = req.flash('error');
    if(errMsg) meg = errMsg;
    res.render('join.ejs', {'message' : meg});
});

//passport.serialize
passport.serializeUser(function(user, done){
    console.log('passport session save : ', user.id);
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    console.log('passport session get id : ', id);
    done(null, id);
})

//살제 인증 처리는 LoalStrategy 메소드 안에서 처리가 된다.
passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, function(req, email, password, done){
    var query = connection.query('select * from user where email=?', [email], function(err, rows){
        if(err) return done(err);

        if(rows.length){
             console.log('existed user');
             return done(null, false, {message : 'your email is already used'});
         }else{
            var sql = {email: email, pw: password};
            var query = connection.query('insert into user set ?', sql, function(err, rows){
                if(err) throw err;
                return done(null, {'email' : email, 'id': rows.insertId});
            });
        }
    })
  }
));

/* post 요청이 들어왔을 때, authenticate함수가 실행이 되고
local-join으로 들어가서 LocalStrategy 처리가 이루어진 다음에
다시 여기로 돌아와서 최종 처리된 결과가 Redirect를 해준다. */
router.post('/', passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true})
);

/*router.post('/', function(req, res){
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var passwd = body.password;

    //sql 객체를 만들어 놓고 query문에 ? 부분에 대입되게 된다.(set을 써서 insert를 간단하게 구현)
    //escaping 하는 항목보면 어떻게 처리하는지 나와있음 -> 추가 공부하면 좋음
    var sql = {email : email, name : name, pw : passwd};
    var query = connection.query('insert into user set ?', sql, function(err, rows){
        if(err) throw err;
        res.render('welcome.ejs', {'name' : name, 'id' : rows.insertId});
    });
});*/


module.exports = router;