var express = require('express');
var morgan = require('morgan');
var logger = require('./logger')
var bodyParser = require('body-parser');

module.exports = function (app, config) {

  if (process.env.NODEMON !== 'test') {
    app.use(morgan('dev'));

    app.use(function (req, res, next) {
      logger.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(express.static(config.root + '/public'));

  // var todo = [{ ToDo: 'carwash', priority: 'Imidiate' },
  // { ToDo: 'Walking', priority: 'Imidiate' }

  // ];

  // app.get('/api/todo', function (req, res) {
  //   res.status(200).json(todo);
  // });

  require('../app/controllers/todo')(app, config);


  app.use(function (req, res) {
    logger.log('error', ' File not found')
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

  logger.log('info', "Starting application");

};  