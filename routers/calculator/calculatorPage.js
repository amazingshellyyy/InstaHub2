var express = require('express')
var router = express.Router();

//appRoot is a global var defined in server.js
var calcPagepath = appRoot + '/public/calculator/calculator.html';

router.route('/')
    .get((req, res) => {
    res.sendFile(calcPagepath)
})

//export this router to be used in our server.js
module.exports = router; 
