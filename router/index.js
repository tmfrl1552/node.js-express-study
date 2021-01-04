var express = require('express');
var router = express.Router(); 
var path = require('path');
//path는 상대경로로 써줘야 한다.(.)
var main = require('./main/main');
var email = require('./email/email');
var join = require('./join/index');
var login = require('./login/index');
var logout = require('./logout/index');
var movie = require('./movie/index');



 //url routing
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/main.html'));
});

//만약에 main으로 들어오잖아 그럼 나 main.js 모듈을 쓰게 해줘.
router.use('/main', main);
router.use('/email', email);
router.use('/join', join);
router.use('/login', login);
router.use('/logout', logout);
router.use('/movie', moviee);



/* bodyParser같은 것들은 app.js에서 선언을 했으므로 main, email 등에서도 사용 가능하다. */

module.exports = router;