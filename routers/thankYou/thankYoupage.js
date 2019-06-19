var express = require('express')
var router = express.Router();

//appRoot is a global var defined in server.js
var tyPagepath = appRoot + '/public/thankYou/thankyou.html';

router.route('/')
    .get((req, res) => {
    res.sendFile(tyPagepath)
})

//export this router to be used in our server.js
module.exports = router; 
