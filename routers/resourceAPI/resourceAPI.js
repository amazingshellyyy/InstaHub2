var express = require('express');
var router = express.Router();
var eiaCred = require('./eia.js');
var request = require('request');

//proxy between calculator and EIA API
//because govt API is unsecured so browser wont load except
//when explicitly told to load

router.route('/')
    .get((req, res) => {
    var state = req.query.state;
    var buildingType = req.query.buildingType;

    console.log("State is: " + state)
    console.log("Buidling type is: " + buildingType)

    var apiUrl = `http://api.eia.gov/series/?api_key=${eiaCred.apiKey}&series_id=ELEC.PRICE.`

    apiUrl += state + "-" + buildingType + ".M";

    request(apiUrl, (error, response, body) =>{

        if(!error && response.statusCode == 200){
	    console.log(apiUrl)
	    res.send(response)
        }
    })

    })

module.exports = router
