'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Scrapper = mongoose.model('Scrapper'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  osmosis = require('osmosis'),
  URL = require('url');
  const url = require('url');
  
/**
 * Create a Scrapper
 */
exports.create = function(req, res) {

  function scrp(url, price, dis, img, title){
    if(url == 'err'){
      res.jsonp({
        'price':    '',
        'dis' :   '',
        'img' : '',
        'title' : ''
      });
      }
      else{
        osmosis
        .get(url)
        .set({
            'price':    price,
            'dis' :   dis,
            'img' : img,
            'title' : title
        }) 
        .data(function(listing) {
            console.log('listung', listing)
            if(Object.keys(listing).length !== 0){    
              console.log('dome')              
              res.jsonp(listing);
            }
            else{
              console.log('not dome')
              
              res.json({
                'price':    '',
                'dis' :   '',
                'img' : '',
                'title' : ''
              });
            }
            
        })
        .log(console.log)
        .error(console.log)
        .debug(console.log)
      }
    }

  var scrapper = req.body 
  scrapper.user = req.user;

  const myUrl = url.parse(scrapper.url);
  switch(myUrl.hostname){
    case 'www.ae.com' : 
      scrp(scrapper.url, '#psp-sale-price', '.psp-product-color', '#carousel-inner > .item-img[1] img@src')
      break;
    case 'www.amazon.com' : 
      scrp(scrapper.url, '#priceblock_ourprice', '#variation_color_name .selection', '.itemNo0 #landingImage@src', '#productTitle');
      break;
    case 'www.amazon.co.uk' : 
      scrp(scrapper.url, '#priceblock_ourprice', '#variation_color_name .selection', '.itemNo0 #landingImage@src');
      break;
    default :
      scrp('err', '', '', '','')
  }
  
};
 

/**
 * Show the current Scrapper
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var scrapper = req.scrapper ? req.scrapper.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  scrapper.isCurrentUserOwner = req.user && scrapper.user && scrapper.user._id.toString() === req.user._id.toString();

  res.jsonp(scrapper);
};

/**
 * Update a Scrapper
 */
exports.update = function(req, res) {
  var scrapper = req.scrapper;

  scrapper = _.extend(scrapper, req.body);

  scrapper.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(scrapper);
    }
  });
};

/**
 * Delete an Scrapper
 */
exports.delete = function(req, res) {
  var scrapper = req.scrapper;

  scrapper.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(scrapper);
    }
  });
};

/**
 * List of Scrappers
 */
exports.list = function(req, res) {
  Scrapper.find().sort('-created').populate('user', 'displayName').exec(function(err, scrappers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(scrappers);
    }
  });
};

/**
 * Scrapper middleware
 */
exports.scrapperByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Scrapper is invalid'
    });
  }

  Scrapper.findById(id).populate('user', 'displayName').exec(function (err, scrapper) {
    if (err) {
      return next(err);
    } else if (!scrapper) {
      return res.status(404).send({
        message: 'No Scrapper with that identifier has been found'
      });
    }
    req.scrapper = scrapper;
    next();
  });
};