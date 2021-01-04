var express = require('express');
var router = express.Router(); 
//상대 경로 지정
var path = require('path');

// /main으로 들어오면 app.js에서 받아서 여기로 들어오므로
// 여기는 root로 받아야 한다.
//main page는 login이 될 때만(즉 세션정보가 있을때만) 접근이 가능하게 하자.
 router.get('/', function(req, res){
    console.log('main js loaded', req.user);
    var id = req.user;
    //sres.sendFile(path.join(__dirname, '../public/main.html'));
    if(!id) res.render('login.ejs');
    res.render('main.ejs', {'id' : id});
});

//router가 export됨으로써 다른 파일에서 이 파일(main.js)을 쓸 수 있다.
module.exports = router;

