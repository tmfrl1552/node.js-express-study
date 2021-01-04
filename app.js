var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router/index');
//session 관련(모듈 사용법 github 사이트에서 알아보면 좋음)
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash'); // 메세지를 쉽게 전달해주는 것

/* 서버 띄우고 */
app.listen(3000, function(){
    console.log("start, express server on port 3000");
});

/* 사용되는 미들웨어(사용되는 모듈들) 띄우고 */
 //express가 public이라는 디렉토리를 static으로 기억함
app.use(express.static('public'));
//client로부터 오는 응답이 json형식인 것을 사용하겠다.
app.use(bodyParser.json());
//client로부터 오는 웅답이 json이 아닌 그냥 post형식으로 올 때
//client에서 보낼 때 encode돼서 보내므로 encode된 걸 받겠다! 이런 뜻
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs'); 

//session관련된 use는 router 전에 써주는 게 좋다. (router에서 사용할 수도 있기 때문)
app.use(session({
    secret: 'keyboard cat', //session을 암호화하기 위한 키 값
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/* routing 모듈화하는 부분 */
//path가 없는 경우에는 router모듈을 쓸래!만 해주는 것이다.
app.use(router);


