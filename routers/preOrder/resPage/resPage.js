var express = require('express')
var router = express.Router();

//appRoot is a global var defined in server.js
var resPagepath = appRoot +  '/public/preOrder/signUpResidential.html';

router.route('/')
    .get((req, res) => {
    res.sendFile(resPagepath)
})

//export this router to be used in our server.js
module.exports = router; 
