var express = require('express');
var app = module.exports = express();
var bodyparser = require('body-parser');
var config = require('./config.js');
var helmet = require('helmet');
var allowCors = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'asdasd:5000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
	next();
}
app.listen(5000);
app.use(helmet());
app.use(allowCors);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended: true
}));
