'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  Brand = mongoose.model('Brandsuk'),
  deliveryCharge = mongoose.model('DeliveryukCharge'),
  Rate = mongoose.model('Ukrate'),
  Shipping = mongoose.model('ShippingukCharge'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Brand
 */
exports.create = function (req, res) {
  var brand = new Brand(req.body);
  brand.user = req.user;

 if (!brand.order_number) {
      Brand.count({}, function (err, count) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          brand.order_number = Number(count) + 1;
          brand.save(function (err, b) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
                res.jsonp(b);
            }
          });
        }
      })
    } else {
      Brand.findOne({
        order_number: brand.order_number
      }, function (err, item) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else if (!item || item == null || item == '') {
          brand.save(function (err, b) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
                res.jsonp(b);
            }
          });
        } else {
          Brand.count({}, function (err, count) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              Brand.findByIdAndUpdate(item._id, {
                $set: {
                  order_number: Number(count) + 1
                }
              }, function (e, i) {
              //  console.log(e, i)
              });
              brand.save(function (err, b) {
                if (err) {
                  return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                  });
                } else {
                 res.jsonp(b);
                }
              });
            }
          })
        }
      });
    }

};

/**
 * Show the current Brand
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var brand = req.brand ? req.brand.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  brand.isCurrentUserOwner = req.user && brand.user && brand.user._id.toString() === req.user._id.toString();

  res.jsonp(brand);
};

/**
 * Update a Brand
 */
exports.update = function (req, res) {
  var brand = req.brand;

  brand = _.extend(brand, req.body);

  brand.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(brand);
    }
  });
};

/**
 * Delete an Brand
 */
exports.delete = function (req, res) {
  var brand = req.brand;
  console.log("Brands ====================", req.brand);
  if (req.brand._id) {
    var BrandID = req.brand._id;
    console.log(BrandID);
    deliveryCharge.remove({
      brands: BrandID
    }, function (err, d) {
      console.log(err, d)
    });
    Shipping.remove({
      brands: BrandID
    }, function (err, s) {
      console.log(err, s)
    });
  }
  brand.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(brand);
    }
  });
};

/**
 * List of Brands
 */
exports.list = function (req, res) {
  //console.log(req.headers.authorization);
  Brand.find().sort('order_number').populate('user', 'displayName').exec(function (err, brands) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(brands);
    }
  });
};

/**
 * Brand middleware
 */
exports.brandByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Brand is invalid'
    });
  }

  Brand.findById(id).populate('user', 'displayName').exec(function (err, brand) {
    if (err) {
      return next(err);
    } else if (!brand) {
      return res.status(404).send({
        message: '2No Brand with that identifier has been found'
      });
    }
    req.brand = brand;
    next();
  });
};


function insertAllCharges(index, brand_id, arr, cb) {
  if (index == arr.length) {
    cb(arr);
  } else {
    var shipping = {
      brands: brand_id,
      products: arr[index]._id,
      type: 'delivery'
    }
    var deliverys = {
      brands: brand_id,
      products: arr[index]._id,
      type: 'shipping'
    }
    Shipping(shipping).save(function (err, ship) {
      var charges = [{
          quantity: 1,
          charges: 1000,
          shippings: ship._id
        },
        {
          quantity: 2,
          charges: 900,
          shippings: ship._id
        },
        {
          quantity: 3,
          charges: 800,
          shippings: ship._id
        },
        {
          quantity: 4,
          charges: 700,
          shippings: ship._id
        },
        {
          quantity: 5,
          charges: 600,
          shippings: ship._id
        },
        {
          quantity: 6,
          charges: 500,
          shippings: ship._id
        },
        {
          quantity: 7,
          charges: 400,
          shippings: ship._id
        },
        {
          quantity: 8,
          charges: 300,
          shippings: ship._id
        },
        {
          quantity: 9,
          charges: 200,
          shippings: ship._id
        },
        {
          quantity: 10,
          charges: 100,
          shippings: ship._id
        },
        {
          minimum: 100,
          shippings: ship._id
        }
      ];
      Rate.insertMany(charges, function (err, data) {
        console.log(err, data);
      });

      Shipping(deliverys).save(function (err, delivery) {
        var charges = [{
            quantity: 1,
            charges: 1000,
            shippings: delivery._id
          },
          {
            quantity: 2,
            charges: 900,
            shippings: delivery._id
          },
          {
            quantity: 3,
            charges: 800,
            shippings: delivery._id
          },
          {
            quantity: 4,
            charges: 700,
            shippings: delivery._id
          },
          {
            quantity: 5,
            charges: 600,
            shippings: delivery._id
          },
          {
            quantity: 6,
            charges: 500,
            shippings: delivery._id
          },
          {
            quantity: 7,
            charges: 400,
            shippings: delivery._id
          },
          {
            quantity: 8,
            charges: 300,
            shippings: delivery._id
          },
          {
            quantity: 9,
            charges: 200,
            shippings: delivery._id
          },
          {
            quantity: 10,
            charges: 100,
            shippings: delivery._id
          },
          {
            minimum: 100,
            shippings: delivery._id
          }
        ];
        Rate.insertMany(charges, function (err, data) {
          console.log(err, data);
          index = index + 1;
          insertAllCharges(index, brand_id, arr, cb);
        });
      });
    });
  }
}

// function InsertAllRates(index,arr,cb){
//   if(index ==arr.length){
//     cb('done');
//   }else{
//     arr[index] = JSON.stringify(arr[index]);
//     arr[index] = JSON.parse(arr[index]);
//     var charges = [{
//           quantity: 1,
//           charges: 10,
//           product_id: arr[index]._id,
//           type:'shipping'
//         },
//         {
//           quantity: 2,
//           charges: 9,
//           product_id: arr[index]._id,
//           type:'shipping'
//         },
//         {
//           quantity: 3,
//           charges: 8,
//           product_id: arr[index]._id,
//           type:'shipping'
//         },
//         {
//           quantity: 4,
//           charges: 7,
//           product_id: arr[index]._id,
//           type:'shipping'
//         },
//         {
//           quantity: 5,
//           charges: 6,
//           product_id: arr[index]._id,
//           type:'shipping'
//         },
//         {
//           quantity: 6,
//           charges: 5,
//           product_id: arr[index]._id,
//           type:'shipping'
//         },
//         {
//           quantity: 7,
//           charges: 4,
//           product_id: arr[index]._id,
//           type:'shipping'
//         },
//         {
//           quantity: 8,
//           charges: 3,
//           product_id: arr[index]._id,
//           type:'shipping'
//         },
//         {
//           quantity: 9,
//           charges: 2,
//           product_id: arr[index]._id,
//           type:'shipping'
//         },
//         {
//           quantity: 10,
//           charges: 1,
//           product_id: arr[index]._id,
//           type:'shipping'
//         },
//         {
//           minimum: 1,
//           product_id: arr[index]._id,
//           type:'shipping'
//         }
//       ];

//       var Dcharges = [{
//           quantity: 1,
//           charges: 10,
//           product_id: arr[index]._id,
//           type:'delivery'
//         },
//         {
//           quantity: 2,
//           charges: 9,
//           product_id: arr[index]._id,
//           type:'delivery'
//         },
//         {
//           quantity: 3,
//           charges: 8,
//           product_id: arr[index]._id,
//           type:'delivery'
//         },
//         {
//           quantity: 4,
//           charges: 7,
//           product_id: arr[index]._id,
//           type:'delivery'
//         },
//         {
//           quantity: 5,
//           charges: 6,
//           product_id: arr[index]._id,
//           type:'delivery'
//         },
//         {
//           quantity: 6,
//           charges: 5,
//           product_id: arr[index]._id,
//           type:'delivery'
//         },
//         {
//           quantity: 7,
//           charges: 4,
//           product_id: arr[index]._id,
//           type:'delivery'
//         },
//         {
//           quantity: 8,
//           charges: 3,
//           product_id: arr[index]._id,
//           type:'delivery'
//         },
//         {
//           quantity: 9,
//           charges: 2,
//           product_id: arr[index]._id,
//           type:'delivery'
//         },
//         {
//           quantity: 10,
//           charges: 1,
//           product_id: arr[index]._id,
//           type:'delivery'
//         },
//         {
//           minimum: 1,
//           product_id: arr[index]._id,
//           type:'delivery'
//         }
//       ];
//       Rate.insertMany(charges, function (err, data) {
//         console.log(err, data);
//         Rate.insertMany(Dcharges, function(err,data){
//             index = index+1;
//            InsertAllRates(index,arr,cb);
//         })
       
//       });
//   }
// }

// Product.find({}, function(err,productsList){
//   if(err){
//     console.log(err);
//   }else{
//     InsertAllRates(0,productsList, function(data){
//       console.log(data);
//     })
//   }
// })