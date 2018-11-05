var path = require('path'),    
       rootPath = path.normalize(__dirname + '/..'),    
       //env = process.env.NODE_ENV || 'development';
       env = process.env.NODEMON||'test';

var config = {  
       //development: {    
                  // root: rootPath,    
                  // app: {      name: 'NodeApps/PracticeMidterm'    },    
                  // port: 3300,  
        //},  

        NODEMON: {    
            root: rootPath,    
            app: { name: 'NodeApps/PracticeMidterm' },    
            port: 3300,  
        },

        test: {
            root: rootPath,
            app: { name: 'NodeApps/PracticeMidterm' },
            port: 3300,
            }
            
        //production: {    
                    // root: rootPath,    
                    // app: {      name: 'NodeApps/PracticeMidterm'    },    
                    //  port: 80,  }
         };

module.exports = config[env];
