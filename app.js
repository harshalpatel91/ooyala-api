var express = require('express');
var os = require('os');
var fs = require('fs');
var app = express();
var request = require('request');
var path = require('path');
var ooyalaApi = require('ooyala-api');

var port = process.env.PORT || 5000;


app.use('/ooyala', function(req, res) {
	var ooyalaApiKey = req.headers.api_key;
	var ooyalaSecretKey = req.headers.secret;
	var api = new ooyalaApi(ooyalaApiKey, ooyalaSecretKey, {concurrency: 6});

	//res.setHeader('Content-Type', 'application/json');

	api.get(req.url)
		.then((body) => {
			res.send(body);
		})
		.catch((err) => {
		  	res.send(err);
		});

	

});




app.listen(port);


