var express = require('express');
var os = require('os');
var fs = require('fs');
var app = express();
var request = require('request');
var path = require('path');
var ooyalaApi = require('ooyala-api');
var Ooyala = require('ooyala');

var port = process.env.PORT || 5000;


app.use('/ooyala', function(req, res) {
	var ooyalaApiKey = req.headers.api_key;
	var ooyalaSecretKey = req.headers.secret;
	var api = new ooyalaApi(ooyalaApiKey, ooyalaSecretKey, {concurrency: 6});

	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');

	api.get(req.url)
		.then((body) => {
			res.send(body);
		})
		.catch((err) => {
		  	res.send(err);
		});
});

app.use('/ooyala-search', function(req, res) {
	var ooyalaApiKey = req.headers.api_key;
	var ooyalaSecretKey = req.headers.secret;
	var api = new ooyalaApi(ooyalaApiKey, ooyalaSecretKey, {concurrency: 6});
	var search = "name='"+req.query.search+"' OR description='"+req.query.search+"'";
	
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');

	api.get('/v2/assets', {where: search}, {recursive: true})
		.then((items) => {
		  	// All items in an array (recursive calls will be done internally)
			res.send(items);
		})
		.catch((err) => {
		  	// Error response
			res.send(err);
		});	
});




app.listen(port);


