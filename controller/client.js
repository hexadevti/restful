var Client = require('../model/client.js');
var validator = require('validator');

var clients = module.exports = {
    item :
        function (req, res) {
	        
            Client.find({ userId: req.user._id }, function(error, client) {
                if (error) {
                    res.json({ error: 'Não foi possível recuperar clients'});
                } else {
                    res.json(client);
                }
	        });
        },
    save : 
        function (req, res) {
            new Client({
                name: validator.trim(validator.escape(req.body.name)),
                id: validator.trim(validator.escape(req.body.id)),
                secret: validator.trim(validator.escape(req.body.secret)),
                userId: req.user._id
            }).save(function(error, client) {
                if (error) {
                    res.json({
                        error: 'Não foi possível salvar client'
                    });
                } else {
                    res.json(client);
                }

	        })
        }
}