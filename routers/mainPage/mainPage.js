var express = require('express')
var router = express.Router();

//appRoot is a global var defined in server.js
var mainPagepath = appRoot +  '/public/main/index.html';

router.route('/')
    .get((req, res) => {
    res.sendFile(mainPagepath)
})

//export this router to be used in our server.js
module.exports = router; 
