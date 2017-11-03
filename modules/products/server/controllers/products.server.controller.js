'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  Brand = mongoose.model('Brand'),
  deliveryCharge = mongoose.model('DeliveryCharge'),
  Rate = mongoose.model('Rate'),
  Shipping = mongoose.model('ShippingCharge'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Product
 */
exports.create = function (req, res) {
  var product = new Product(req.body);
  product.user = req.user;
  if (!product.order_number) {
      Product.count({}, function (err, count) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          product.order_number = Number(count) + 1;
          product.save(function (err, products) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
             InsertAllRates(products._id, function(data){
               //   console.log(data);
                   res.jsonp(products);
             });
            }
          });
        }
      })
    } else {
      Product.findOne({
        order_number: product.order_number
      }, function (err, item) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else if (!item || item == null || item == '') {
          product.save(function (err, products) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              InsertAllRates(products._id, function(data){
                  //console.log(data);
                   res.jsonp(products);
               });
            }
          });
        } else {
          Product.count({}, function (err, count) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              Product.findByIdAndUpdate(item._id, {
                $set: {
                  order_number: Number(count) + 1
                }
              }, function (e, i) {
              //  console.log(e, i)
              });
              product.save(function (err, products) {
                if (err) {
                  return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                  });
                } else {
                   InsertAllRates(products._id, function(data){
                    // console.log(data);
                    res.jsonp(products);
                   });
                }
              });
            }
          })
        }
      });
    }
};

/**
 * Show the current Product
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var product = req.product ? req.product.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  product.isCurrentUserOwner = req.user && product.user && product.user._id.toString() === req.user._id.toString();

  res.jsonp(product);
};

/**
 * Update a Product
 */
exports.update = function (req, res) {
  var product = req.product;

  product = _.extend(product, req.body);

  product.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(product);
    }
  });
};

/**
 * Delete an Product
 */
exports.delete = function (req, res) {
  var product = req.product;
  product.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if (req.params.productId) {
        Rate.remove({
           product_id: req.params.productId
        }, function(err,del){})
      }
      res.jsonp(product);
    }
  });
};

/**
 * List of Products
 */
exports.list = function (req, res) {
 // console.log(req.headers.authorization);
  Product.find().sort('order_number').exec(function (err, products) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(products);
    }
  });
};

/**
 * Product middleware
 */
exports.productByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Product is invalid'
    });
  }

  Product.findById(id).populate('user', 'displayName').exec(function (err, product) {
    if (err) {
      return next(err);
    } else if (!product) {
      return res.status(404).send({
        message: 'No Product with that identifier has been found'
      });
    }
    req.product = product;
    next();
  });
};


// function insertAllCharges(index, product_id, arr, cb) {
//   if (index == arr.length) {
//     cb(arr);
//   } else {
//     var shipping = {
//       brands: arr[index]._id,
//       products: product_id,
//       type: 'delivery'
//     }
//     var deliverys = {
//       brands: arr[index]._id,
//       products: product_id,
//       type: 'shipping'
//     }
//     Shipping(shipping).save(function (err, ship) {
//       var charges = [{
//           quantity: 1,
//           charges: 1000,
//           shippings: ship._id
//         },
//         {
//           quantity: 2,
//           charges: 900,
//           shippings: ship._id
//         },
//         {
//           quantity: 3,
//           charges: 800,
//           shippings: ship._id
//         },
//         {
//           quantity: 4,
//           charges: 700,
//           shippings: ship._id
//         },
//         {
//           quantity: 5,
//           charges: 600,
//           shippings: ship._id
//         },
//         {
//           quantity: 6,
//           charges: 500,
//           shippings: ship._id
//         },
//         {
//           quantity: 7,
//           charges: 400,
//           shippings: ship._id
//         },
//         {
//           quantity: 8,
//           charges: 300,
//           shippings: ship._id
//         },
//         {
//           quantity: 9,
//           charges: 200,
//           shippings: ship._id
//         },
//         {
//           quantity: 10,
//           charges: 100,
//           shippings: ship._id
//         },
//         {
//           minimum: 100,
//           shippings: ship._id
//         }
//       ];
//       Rate.insertMany(charges, function (err, data) {
//         console.log(err, data);
//       });

//       Shipping(deliverys).save(function (err, delivery) {
//         var charges = [{
//             quantity: 1,
//             charges: 1000,
//             shippings: delivery._id
//           },
//           {
//             quantity: 2,
//             charges: 900,
//             shippings: delivery._id
//           },
//           {
//             quantity: 3,
//             charges: 800,
//             shippings: delivery._id
//           },
//           {
//             quantity: 4,
//             charges: 700,
//             shippings: delivery._id
//           },
//           {
//             quantity: 5,
//             charges: 600,
//             shippings: delivery._id
//           },
//           {
//             quantity: 6,
//             charges: 500,
//             shippings: delivery._id
//           },
//           {
//             quantity: 7,
//             charges: 400,
//             shippings: delivery._id
//           },
//           {
//             quantity: 8,
//             charges: 300,
//             shippings: delivery._id
//           },
//           {
//             quantity: 9,
//             charges: 200,
//             shippings: delivery._id
//           },
//           {
//             quantity: 10,
//             charges: 100,
//             shippings: delivery._id
//           },
//           {
//             minimum: 100,
//             shippings: delivery._id
//           }
//         ];
//         Rate.insertMany(charges, function (err, data) {
//           console.log(err, data);
//           index = index + 1;
//           insertAllCharges(index, product_id, arr, cb);
//         });
//       });
//     });
//   }
// }



function InsertAllRates(product_id,cb){
  var charges = [{
          quantity: 1,
          charges: 10,
          product_id:product_id,
          type:'shipping'
        },
        {
          quantity: 2,
          charges: 9,
          product_id: product_id,
          type:'shipping'
        },
        {
          quantity: 3,
          charges: 8,
          product_id: product_id,
          type:'shipping'
        },
        {
          quantity: 4,
          charges: 7,
          product_id: product_id,
          type:'shipping'
        },
        {
          quantity: 5,
          charges: 6,
          product_id: product_id,
          type:'shipping'
        },
        {
          quantity: 6,
          charges: 5,
          product_id: product_id,
          type:'shipping'
        },
        {
          quantity: 7,
          charges: 4,
          product_id: product_id,
          type:'shipping'
        },
        {
          quantity: 8,
          charges: 3,
          product_id: product_id,
          type:'shipping'
        },
        {
          quantity: 9,
          charges: 2,
          product_id: product_id,
          type:'shipping'
        },
        {
          quantity: 10,
          charges: 1,
          product_id: product_id,
          type:'shipping'
        },
        {
          minimum: 1,
          product_id: product_id,
          type:'shipping'
        }
      ];

      var Dcharges = [{
          quantity: 1,
          charges: 10,
          product_id: product_id,
          type:'delivery'
        },
        {
          quantity: 2,
          charges: 9,
          product_id: product_id,
          type:'delivery'
        },
        {
          quantity: 3,
          charges: 8,
          product_id: product_id,
          type:'delivery'
        },
        {
          quantity: 4,
          charges: 7,
          product_id: product_id,
          type:'delivery'
        },
        {
          quantity: 5,
          charges: 6,
          product_id: product_id,
          type:'delivery'
        },
        {
          quantity: 6,
          charges: 5,
          product_id: product_id,
          type:'delivery'
        },
        {
          quantity: 7,
          charges: 4,
          product_id: product_id,
          type:'delivery'
        },
        {
          quantity: 8,
          charges: 3,
          product_id: product_id,
          type:'delivery'
        },
        {
          quantity: 9,
          charges: 2,
          product_id: product_id,
          type:'delivery'
        },
        {
          quantity: 10,
          charges: 1,
          product_id: product_id,
          type:'delivery'
        },
        {
          minimum: 1,
          product_id: product_id,
          type:'delivery'
        }
      ];
      Rate.insertMany(charges, function (err, data) {
        Rate.insertMany(Dcharges, function(err,data){
           cb('done')
        })
      });
}