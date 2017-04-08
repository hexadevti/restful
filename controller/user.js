var User = require('../model/user.js');
var validator = require('validator');

var users = module.exports = {
    all : 
        function(req, res) {
            User.find({}, function(error, user) {
                if (error) {
                    res.json({
                        error: 'Não foi possível retornar o usuário'
                    });
                } else {
                    res.json(user);
                }
	        });
        },
    item :
        function (req, res) {
            var id = validator.trim(validator.escape(req.param('id')));
	        
            User.findById(id, function(error, user) {
                if (error) {
                    res.json({ error: 'Não foi possível recuperar usuários'});
                } else {
                    res.json(user);
                }
	        });
        },
    me :
        function (req, res) {
            if (req.decoded) {
                User.findOne({ username: req.decoded.data }, function(error, user) {
                    if (error) {
                        res.json({ error: 'Não foi possível recuperar usuários'});
                    } else {
                        user.password = "";
                        res.json(user);
                    }
                });
            }
        },        
    save : 
        function (req, res) {
            new User({
                username: validator.trim(validator.escape(req.body.params.username)),
                email: validator.trim(validator.escape(req.body.params.email)),
                password: validator.trim(validator.escape(req.body.params.password)),
                created_at: new Date()
            }).save(function(error, user) {
                if (error) {
                    res.json({
                        success: false,
                        return: 'Operation Failed!'
                    });
                } else {
                    res.json({ 
                                success: true,
                                return: user });
                }

	        })
        },
    update :
        function (req, res) {
            var id = req.params.id;
            var username = req.body.params.username;
            var email = req.body.params.email;
            var password = req.body.params.password;

            User.findById(validator.trim(validator.escape(id)), function(error, user) {
                if (username)
                    user.username = validator.trim(validator.escape(username));
                if (email)
                    user.email = validator.trim(validator.escape(email));
                if (password)
                    user.password = validator.trim(validator.escape(password));

                user.save(function(error, user) {
                    if (error) {
                    res.json({
                        return: 'Não foi possível salvar user'
                    });
                } else {
                    res.json(user);
                }
                });
            });
        },
    delete :
        function (req, res) {
            var id = validator.trim(validator.escape(req.params.id));
            User.findById(id, function(error, user) {
                if (error) {
                    res.json({ return: 'Não foi possível recuperar usuários'});
                } else {
                    user.remove(function(error) {
                        if (!error) {
                            res.json({ return: 'Usuário removido com sucesso' });
                        }
                    });
                }
            });
        }
}