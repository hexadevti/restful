var app = require('./server.js');
var config = require('./config.js');
var mongoose = require('mongoose').connect(config.db_string);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar base de dados'));

var validator = require('validator'); // validate SQL injection on requests
var user = require('./controller/user.js');
var client = require('./controller/client.js');

var passport = require('passport');
var authController = require('./controller/auth');

app.get('/', function(req, res) {
	res.json({ message: 'Server Active!'});
});

app.get('/auth', authController.isAuthenticated, authController.getToken);

app.get('/users', authController.verifyToken, user.all);

app.get('/users/:id', user.item);

app.post('/users', user.save);	

app.put('/users/:id', user.update);	

app.delete('/users/:id',  user.delete);	

app.post('/clients', client.save);

app.get('/clients', client.item);

