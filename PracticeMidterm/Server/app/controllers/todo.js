
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
module.exports = function (app, config) {

    app.use('/api', router);


    router.route('/todo').get(function (req, res, next) {
        logger.log('info', 'Get all todos');
        res.status(200).json({ message: 'Get all todos' });

    });

    router.route('/todo/:id').get(function (req, res, next) {
        logger.log('info', 'Get user %s', req.params.id);
        res.status(200).json({ message: 'Get todo '+ req.params.id });
    });

    router.route('/login').post(function(req, res, next){
        console.log(req.body);
        var email = req.body.email
        var password = req.body.password;
  
        var obj = {'email' : email, 'password' : password};
      res.status(201).json(obj);
  });
  


};

