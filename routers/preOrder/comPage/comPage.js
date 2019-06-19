var express = require('express')
var router = express.Router();

//appRoot is a global var defined in server.js
var comPagepath = appRoot +  '/public/preOrder/signUpCommercial.html';

router.route('/')
    .get((req, res) => {
    res.sendFile(comPagepath)
})

//export this router to be used in our server.js
module.exports = router; 
