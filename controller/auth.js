var User = require('../model/user.js');
var jwt    = require('jsonwebtoken');
var config = require('../config.js');

exports.isAuthenticated = function(req, res, next) {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) {         
          res.json({
            success: false,
            message: err
          });
     }

      // No user found with that username
      if (!user) { 
          res.json({
            success: false,
            message: err
          }); 
        }

      // Make sure the password is correct
      user.verifyPassword(req.body.password, function(err, isMatch) {
        if (err) { 
            res.json({
                success: false,
                message: err
            }); 
        }

        // Password did not match
        if (!isMatch) {
            res.json({
                success: false,
                message: ''
            }); 
        }

        // Success
        next();
      });
    });


    
};

exports.getToken = function(req, res) {
    var token = jwt.sign({ data: req.body.username }, config.secret, { expiresIn: '2d' });

        // return the information including token as JSON
        res.json({
          success: true,
          token: token
        });
};

exports.verifyToken = function(req, res, next) {
      // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
};

