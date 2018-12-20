var path = require('path'),
       rootPath = path.normalize(__dirname + '/..'),
       env = process.env.NODE_ENV || 'development';


var config = {
       development: {
              root: rootPath,
              app: { name: 'NodeApps/myWebsite' },
              port: 5000,
              db: 'mongodb://127.0.0.1/helpMe-dev',
              uploads: './public/uploadedFiles',
              secret: "cayennedlikedhistreats"

       },

       test: {
              root: rootPath,
              app: { name: 'NodeApps/myWebsite' },
              port: 4000,
              db: 'mongodb://127.0.0.1/helpMe-test',
              uploads: './public/uploadedFiles',
              secret: "cayennedlikedhistreats"

       },

       production: {
              root: rootPath,
              app: { name: 'NodeApps/myWebsite' },
              port: 80,
              db: 'mongodb://127.0.0.1/helpMe',
              uploads: './public/uploadedFiles',
              secret: "cayennedlikedhistreats"

       }
};

module.exports = config[env];

