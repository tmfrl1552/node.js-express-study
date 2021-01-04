var express = require('express');
var router = express.Router(); 
//상대 경로 지정
var path = require('path');
var mysql = require('mysql');

//DATABASE SETTING
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'password',
    database : 'jsman'
});

connection.connect();


//Router !!
router.post('/form', function(req, res){
    //get : req.param('email')
    console.log(req.body.email );
    //res.send("<h1>welcome " + req.body.email + "!</h1>");   
    res.render('email.ejs', {'email' : req.body.email});
});

router.post('/ajax', function(req, res){
    var email  = req.body.email;
    var responseData = {};

    var query = connection.query('select name from user where email="' + email + '"', function(err, rows){
        if(err) throw err;
        if(rows[0]){
            responseData.result = "ok";
            responseData.name = rows[0].name; 
        } else{
            responseData.result = "none";
            responseData.name = ""; 
        }
        res.json(responseData);
    });
});
 
module.exports = router;