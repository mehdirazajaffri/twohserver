'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  mongoose = require('./mongoose'),
  express = require('./express'),
  chalk = require('chalk'),
  seed = require('./seed');

function seedDB() {
  if (config.seedDB && config.seedDB.seed) {
    console.log(chalk.bold.red('Warning:  Database seeding is turned on'));
    seed.start();
  }
}

// Initialize Models
mongoose.loadModels(seedDB);

module.exports.init = function init(callback) {
  mongoose.connect(function (db) {
    // Initialize express
    var app = express.init(db);
    if (callback) callback(app, db, config);

  });
};

// var fbsdk = require('facebook-sdk');

// var facebook = new fbsdk.Facebook({
//   appId  : '739577199541612',
//   secret : 'e54aef25ded733736d8060d0ea756b55'
// });

module.exports.start = function start(callback) {
  var _this = this;

  _this.init(function (app, db, config) {


// facebook.api('EAAKgpDxDPWwBAOxK2RRUJzRmIV3juRfPhbwx9M2TieihZARxHZBQaRASReKLtpQw9WZBaYtdhClD3csEKxkNX0miMphyhG7LT9mtYXZATjaAl6J0Amts48cNKomc5OMN8VLFVVNZCAr8Gz2esza7SGJx7qKhqzIVqUozniDoSDZBziNJDsIEiFdXbQGcj3mV0ZD', function(data) {
//   console.log("Facebook Data ==========",data);
// });

    // Start the app by listening on <port> at <host>
    app.listen(config.port, config.host, function () {
      // Create server URL
      var server = (process.env.PORT || 3000) + config.host + ':' + config.port;
      // Logging initialization
      db.model('Setting').findOne({}, function(err,setting){
        if(setting == null){
          db.model('Setting')({}).save(function(e,r){
            console.log("REcord Inserted",e,r)
          })
        }else{
           global.settings = setting;
        }
      });
      db.model('Uksetting').findOne({}, function(err,setting){
        if(setting == null){
          db.model('Uksetting')({}).save(function(e,r){
            console.log("REcord Inserted",e,r)
          })
        }else{
           global.settingsuk = setting;
        }
      });
      
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log();
      console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
      console.log(chalk.green('Server:          ' + server));
      console.log(chalk.green('Database:        ' + config.db.uri));
      console.log(chalk.green('App version:     ' + config.meanjs.version));
      if (config.meanjs['meanjs-version'])
       // console.log(chalk.green('MEAN.JS version: ' + config.meanjs['meanjs-version']));
      //console.log('--');

      if (callback) callback(app, db, config);
    });

  });

};
