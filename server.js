//express does not come with node
//so we had to installed it with npm
//we also ran npm init
//npm install -s express to save express as one of the
//dependencies in package.json which serves as the package management file
//for other users
//
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var path = require('path');
var request = require('request');

//define our project root path
//in a global variable
global.appRoot = __dirname; 

//importing our own modules

//router for main page
var mainPage = require("./routers/mainPage/mainPage.js")

//routers for residential and commerical pages
var resPage = require("./routers/preOrder/resPage/resPage.js")
var comPage = require("./routers/preOrder/comPage/comPage.js")

//router for calculator page
var calcPage = require("./routers/calculator/calculatorPage.js")

//router for thankyou page
var tyPage = require("./routers/thankYou/thankYoupage.js")

//router for /resource API
var resourceAPI = require("./routers/resourceAPI/resourceAPI.js")

//invoke an instance of the express application
var app = express()

//set our application port
app.set('port', 8080);

//initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

//initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

//initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


//This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
//This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});


//middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

//load static files like css and other JS
//for EJS files that were once HTML
//with static files developed with it
//but we will only render main folder 
app.use(express.static(appRoot + '/public/'));
app.use(express.static(appRoot + '/public/images/'));
app.use(express.static(appRoot + '/public/css/'));
app.use(express.static(appRoot + '/public/calculator/'))
app.use(express.static(appRoot + '/public/thankYou/'))
app.use(express.static(appRoot + '/public/main/'));
app.use(express.static(appRoot + '/public/preOrder/'));

//this is the root directory of everything else so
//make sure you put everything in here
//

/* HOLA app.route('/')
    .get(sessionChecker, (req, res) => {
    	res.render(__dirname + '/public/main/index.ejs'); 
    })*/

app.use('/', mainPage);

/* HOLA app.route('/signUpResidential')
    .get(sessionChecker, (req, res) => {
    	res.render(__dirname + '/public/preOrder/signUpResidential.ejs'); 
	})*/
app.use('/signUpResidential', resPage)

/* HOLA
app.route('/signUpCommercial')
    .get(sessionChecker, (req, res) => {
    	res.render(__dirname + '/public/preOrder/signUpCommercial.ejs'); 
    })*/
app.use('/signUpCommercial', comPage)

/* HOLA app.route('/preOrder')
    .get(sessionChecker, (req, res) => {
	res.render(__dirname + '/public/preOrder.ejs')
    })*/

/* HOLA app.route('/calculator')
    .get(sessionChecker, (req, res) => {
	res.render(__dirname + '/public/calculator/calculator.ejs')
    })*/
app.use('/calculator', calcPage)

/* HOLA app.route('/thankyou')
    .get(sessionChecker, (req, res) => {
	res.render(__dirname + '/public/thankYou/thankyou.ejs')
	})*/

app.use('/thankyou', tyPage)


// HOLAproxy between calculator and EIA API                             //because govt API is unsecured so browser wont load except
//when explicitly told to load
/*app.get('/resource', (req, res) => {

    var state = req.query.state;
    var buildingType = req.query.buildingType;

    console.log("State is: " + state)
    console.log("Buidling type is: " + buildingType)

    var apiUrl = 'http://api.eia.gov/series/?api_key=5e1955ee22d33634eb902572e0409720&series_id=ELEC.PRICE.'
    apiUrl += state + "-" + buildingType + ".M";
    request(apiUrl, (error, response, body) =>{

        if(!error && response.statusCode == 200){
            res.send(response)
        }
    })

})*/

app.use('/resource', resourceAPI);

//route for handling 404 requests(unavailable routes)                             
app.use(function (req, res, next) {
    //res.status(404).send("Sorry can't find that! Redirecting to Home")
    res.redirect("/")
});


//start the express server   
//
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
