'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    Rate = mongoose.model('Rate'),
    Brand = mongoose.model('Brand'),
    Promo = mongoose.model('Promo'),
    Shipping = mongoose.model('ShippingCharge'),
    OrderNumber = mongoose.model('OrderNumber'),
    UsedPromoCode = mongoose.model('UsedPromoCode'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash'),
    Filter = require('../../../dbFilters'),
    nodemailer = require('nodemailer'),
    smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'twohonlineemail@gmail.com',
            pass: 'abc123++'
        }
    });


/**
 * Create a Order
 */
exports.create = function(req, res) {
    var order = req.body
    order.user = req.user;
    //order.user = "5890652cdd837b0011f5dbde"
    console.log("order =========================", JSON.stringify(req.body));
    var itemsArr = groupBy(order.items, 'product_id');
    getBrandsRate(0, order.items, 0, 0, function(items, shippingTotal, grandTotal, obj, delCharges) {
        if (obj) {
            order.items = obj.items;
            return res.status(400).send(order);
        } else {
            getPromoIfAvailable(req.user._id, function(e, promo) {
                if (e) {
                    order.items = items;
                    order.order_status = "reviewing";
                    order.total_shipping = (shippingTotal);
                    if (grandTotal < 40) {
                        order.total_shipping = 6;
                    }
                    order.total_amount = (grandTotal);
                    order.tax = (global.settings.tax_percentage * Number(grandTotal));
                    order.grand_total = (shippingTotal + grandTotal);
                    order.service_charges = (global.settings.service_charges_percentage * order.grand_total);
                    order.grand_total = (Number(order.grand_total) + Number(order.service_charges));
                    order.delivery_charges = delCharges;
                    order.price_pkr = (global.settings.us_doller * order.grand_total);
                    order.security_deposit = (global.settings.deposit_percentage * Number(order.price_pkr));
                    order.cod = Number(order.price_pkr) - Number(order.security_deposit);
                    GenerateOrderId(function(orderNumber) {
                        order.order_number = orderNumber;
                        Order(order).save(function(err) {
                            if (err) {
                                return res.status(400).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            } else {
                                res.jsonp(order);
                            }
                        });
                    });
                } else {
                    order.items = items;
                    order.order_status = "reviewing";
                    order.total_shipping = (shippingTotal);
                    if (grandTotal < 40) {
                        order.total_shipping = 6;
                    }
                    order.total_amount = (grandTotal);
                    order.tax = (global.settings.tax_percentage * Number(order.total_amount));
                    order.grand_total = (shippingTotal + grandTotal);
                    order.service_charges = (global.settings.service_charges_percentage * order.grand_total);
                    order.grand_total = (order.grand_total + order.service_charges);
                    order.delivery_charges = delCharges;
                    order.price_pkr = (global.settings.us_doller * order.grand_total);
                    if (promo.promo) {
                        var promos = promo.promo;
                        if (promos.type == 'free_delivery') {
                            order.discount = delCharges;
                            order.discountFor = "free_delivery";
                            order.discountMessage = "You got free delivery for this order";
                            order.delivery_charges = 0;
                        }
                        if (promos.type == 'shipping_percentage') {
                            var discountPercentage = (promos.value / 100) * order.total_shipping;
                            order.total_shipping = (order.total_shipping - discountPercentage);
                            order.discount = promos.value;
                            order.discountFor = "shipping_percentage";
                            order.discountMessage = "You got " + promos.value + "% discount in shipping charges";
                        }
                        if (promos.type == 'free_shopping') {
                            order.price_pkr = Number(parseFloat(order.price_pkr - Number(promos.value)).toFixed(2));
                            order.discount = promos.value;
                            order.discountFor = "free_shopping";
                            order.discountMessage = "You got free shopping PKR" + promos.value + " discount for this order";
                        }
                        if (promos.type == 'deposit_voucher') {
                            if(Number(promos.value) > Number(order.price_pkr)){
                                order.price_pkr = 0.00;
                                order.discount = order.price_pkr;
                                order.discountFor = "deposit_voucher";
                                order.discountMessage = "You already paid PKR" + order.price_pkr + " amount";
                                var remaminngPromo = (Number(promos.value) - Number(order.price_pkr));
                                Promo.update({_id:promos._id},{$set:{value:remaminngPromo}}, function(err,updatePromos){});
                            }else{
                                order.price_pkr = Number(parseFloat(order.price_pkr - Number(promos.value)).toFixed(2));
                                order.discount = promos.value;
                                order.discountFor = "deposit_voucher";
                                order.discountMessage = "You already paid PKR" + promos.value + " amount";
                                UsedPromoCode.update({
                                    user: req.user._id
                                }, {
                                  $set: {
                                        is_used: true
                                  }
                                }, {
                                 multi: true
                                }).exec(function(err, PromoCount) {});   
                            }
                        }
                        if(promos.type != 'deposit_voucher'){
                            UsedPromoCode.update({
                            user: req.user._id
                        }, {
                            $set: {
                                is_used: true
                            }
                        }, {
                            multi: true
                        }).exec(function(err, PromoCount) {});
                        }
                    }
                    order.security_deposit = (global.settings.deposit_percentage * Number(order.price_pkr));
                    order.cod = Number(order.price_pkr) - Number(order.security_deposit);
                    GenerateOrderId(function(orderNumber) {
                        order.order_number = orderNumber;
                        order.save(function(err) {
                            if (err) {
                                return res.status(400).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            } else {
                                res.jsonp(order);
                            }
                        });
                    });
                }
            });
        }
    }, 0);
};

/**
 * Show the current Order
 */
exports.read = function(req, res) {
    // convert mongoose document to JSON
    var order = req.order ? req.order.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    order.isCurrentUserOwner = req.user && order.user && order.user._id.toString() === req.user._id.toString();

    res.jsonp(order);
};

/**
 * Update a Order
 */
exports.update = function(req, res) {
    var order = req.order;

    order = _.extend(order, req.body);

    order.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });

        } else {
            // Here We have to send email to user that your order has been update
            var userEmail = order._doc.user_id.email,
                order_number = order.order_number,
                order_status = req.body.order_status;

            sendOrderStatusChangeEmail(userEmail, order_number, order_status);
            res.jsonp(order);
        }
    });
};

/**
 * Delete an Order
 */
exports.delete = function(req, res) {
    var order = req.order;

    order.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(order);
        }
    });
};

/**
 * List of Orders
 */
exports.list = function(req, res) {
    Order.find().sort('-created').populate('user_id').exec(function(err, orders) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(orders);
        }
    });
};

/**
 * Order middleware
 */
exports.orderByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Order is invalid'
        });
    }

    Order.findById(id).populate('user_id').exec(function(err, order) {
        if (err) {
            return next(err);
        } else if (!order) {
            return res.status(404).send({
                message: 'No Order with that identifier has been found'
            });
        }
        req.order = order;
        next();
    });
};

exports.checkRates = function(req, res) {
    var order = req.body;
    getBrandsRate(0, order.items, 0, 0, function(items, shippingTotal, grandTotal, obj, delCharges) {
        if (obj) {
            order.items = obj.items;
            return res.status(400).send(order);
        } else {
            getPromoIfAvailable(req.user._id, function(e, promo) {
                if (e) {
                    order.items = items;
                    order.total_shipping = (shippingTotal);
                    if (grandTotal < 40) {
                        order.total_shipping = 6;
                    }
                    order.tax = (global.settings.tax_percentage * Number(grandTotal));
                    order.delivery_charges = delCharges;
                    order.total_amount = (grandTotal);
                    order.grand_total = (shippingTotal + grandTotal);
                    order.service_charges = (global.settings.service_charges_percentage * order.grand_total);
                    order.grand_total = (order.grand_total + order.service_charges);
                    order.price_pkr = (global.settings.us_doller * order.grand_total);
                    order.security_deposit = (global.settings.deposit_percentage * Number(order.price_pkr));
                    order.cod = Number(order.price_pkr) - Number(order.security_deposit);
                    return res.send({
                        code: 200,
                        success: true,
                        data: order,
                        message: "Successfully found"
                    });
                } else {
                    order.items = items;
                    order.total_shipping = (shippingTotal);
                    if (grandTotal < 40) {
                        order.total_shipping = 6;
                    }
                    order.total_amount = (grandTotal);
                    order.tax = (global.settings.tax_percentage * Number(order.total_amount));
                    order.grand_total = (shippingTotal + grandTotal);
                    order.service_charges = (global.settings.service_charges_percentage * order.grand_total);
                    order.grand_total = (order.grand_total + order.service_charges);
                    order.delivery_charges = delCharges;
                    order.price_pkr = (global.settings.us_doller * order.grand_total);
                    if (promo.promo) {
                        var promos = promo.promo;
                        if (promos.type == 'free_delivery') {
                            order.discount = delCharges;
                            order.discountFor = "free_delivery";
                            order.discountMessage = "You got free delivery for this order";
                            order.delivery_charges = 0;
                        }
                        if (promos.type == 'shipping_percentage') {
                            var discountPercentage = (promos.value / 100) * order.total_shipping;
                            order.total_shipping = (order.total_shipping - discountPercentage);
                            order.discount = promos.value;
                            order.discountFor = "shipping_percentage";
                            order.discountMessage = "You got " + promos.value + "% discount in shipping charges";
                        }
                        if (promos.type == 'free_shopping') {
                            order.price_pkr = Number(parseFloat(order.price_pkr - Number(promos.value)).toFixed(2));
                            order.discount = promos.value;
                            order.discountFor = "free_shopping";
                            order.discountMessage = "You got free shopping PKR" + promos.value + " discount for this order";
                        }
                        if (promos.type == 'deposit_voucher') {
                            if(Number(promos.value) > Number(order.price_pkr)){
                                order.price_pkr = 0.00;
                                order.discount = order.price_pkr;
                                order.discountFor = "deposit_voucher";
                                order.discountMessage = "You already paid PKR" + order.price_pkr + " amount";
                            
                            }else{
                                order.price_pkr = Number(parseFloat(order.price_pkr - Number(promos.value)).toFixed(2));
                                order.discount = promos.value;
                                order.discountFor = "deposit_voucher";
                                order.discountMessage = "You already paid PKR" + promos.value + " amount";   
                            }
                        }
                    }
                    order.security_deposit = (global.settings.deposit_percentage * Number(order.price_pkr));
                    order.cod = Number(order.price_pkr) - Number(order.security_deposit);
                    return res.send({
                        code: 200,
                        success: true,
                        data: order,
                        message: "Successfully found"
                    });

                }
            });
        }
    }, 0);
}

exports.getAllOrders = function(req, res) {

    Order.find({
        user_id: req.user._id
    }, function(err, orderList) {
        if (err) {
            return res.status(400).send({
                message: 'Database Occurred Error',
                error: error
            });
        } else {
            return res.send({
                code: 200,
                success: true,
                data: orderList,
                message: "Successfully found"
            });
        }
    });
};

function getBrandsRate(index, arr, total, grandTotal, cb, deliveryCharges) {
    if (index == arr.length) {
        cb(arr, total, grandTotal, null, deliveryCharges);
    } else {
        Shipping.find()
            .populate({
                model: 'Brand',
                path: 'brands'
            })
            .populate({
                model: 'Product',
                path: 'products',
                match: {
                    _id: arr[index]['product_id']
                }
            })
            .exec(function(err, charges) {
                if (err) {
                    console.log(err);
                    index = index + 1;
                    getBrandsRate(index, arr, total, grandTotal, cb, deliveryCharges);
                } else {
                    var pricing = [];
                    var delPricing = []
                    if (charges.length > 0) {
                        getCharges(0, charges, arr[index], function(list, val) {
                            if (val) {
                                arr[index]['isInvalid'] = true;
                                cb(null, null, null, {
                                    code: 400,
                                    isValid: false,
                                    success: false,
                                    message: "Some Thing Wrong In Product",
                                    items: arr
                                })
                            } else {
                                getDeliveryCharges(0, charges, arr[index], function(delList, E) {
                                    if (E) {
                                        arr[index]['isInvalid'] = true;
                                        cb(null, null, null, {
                                            code: 400,
                                            isValid: false,
                                            success: false,
                                            message: "Some Thing Wrong In Product",
                                            items: arr
                                        })
                                    } else {
                                        arr[index]['isValid'] = true;
                                        pricing = list;
                                        delPricing = delList
                                        var biggestCharge = 0;
                                        if (pricing.length > 0) {
                                            pricing.forEach(function(v, k) {
                                                v = JSON.stringify(v);
                                                v = JSON.parse(v);
                                                if (v['quantity'] == arr[index]['quantity']) {
                                                    arr[index]['shipping_charges'] = Number(v['charges']);
                                                    total += Number(v['charges']);
                                                    grandTotal += Number(arr[index]['quantity']) * Number(arr[index]['price'])
                                                }
                                            });
                                        }
                                        if (delPricing.length > 0) {
                                            delPricing.forEach(function(v, k) {
                                                v = JSON.stringify(v);
                                                v = JSON.parse(v);
                                                if (v['quantity'] == arr[index]['quantity']) {
                                                    arr[index]['delivery_charges'] = Number(v['charges']);
                                                    deliveryCharges += Number(v['charges']);
                                                }
                                            });
                                        }
                                        if (!arr[index]['shipping_charges']) {
                                            var t = pricing;
                                            arr[index]['shipping_charges'] = Math.min.apply(Math, t.map(function(o) {
                                                return o.minimum ? o.minimum : o.charges;
                                            }));
                                            total += Number(arr[index]['shipping_charges']);
                                            grandTotal += Number(arr[index]['quantity']) * Number(arr[index]['price'])
                                        }
                                        if (!arr[index]['delivery_charges']) {
                                            var tL = delPricing;
                                            arr[index]['delivery_charges'] = Math.min.apply(Math, t.map(function(o) {
                                                return o.minimum ? o.minimum : o.charges;
                                            }));
                                            deliveryCharges += Number(arr[index]['delivery_charges']);
                                            grandTotal += Number(arr[index]['quantity']) * Number(arr[index]['price'])
                                        }
                                        index = index + 1;
                                        getBrandsRate(index, arr, total, grandTotal, cb, deliveryCharges);
                                    }
                                });
                            }
                        })
                    } else {
                        index = index + 1;
                        getBrandsRate(index, arr, total, grandTotal, cb, deliveryCharges);
                    }
                }
            });
    }
}


function getCharges(index, arr, item, cb) {
    if (index == arr.length) {
        cb([], true);
    } else {
        arr[index] = JSON.stringify(arr[index]);
        arr[index] = JSON.parse(arr[index]);
        if (arr[index]['brands'] && arr[index]['products'] && arr[index]['type'] == 'shipping') {
            if (item['url'].indexOf(arr[index]['brands']['url']) > -1) {
                Rate.find({
                    shippings: arr[index]['_id']
                }, function(err, List) {
                    if (err) {
                        index = index + 1;
                        getCharges(index, arr, item, cb)
                    } else if (List.length == 0 && !List) {
                        index = index + 1;
                        getCharges(index, arr, item, cb)
                    } else {
                        item['brands'] = arr[index]['brands'];
                        return cb(List);

                    }
                });
            } else {
                index = index + 1;
                getCharges(index, arr, item, cb);
            }
        } else {
            index = index + 1;
            getCharges(index, arr, item, cb);
        }

    }
}

function getDeliveryCharges(index, arr, item, cb) {
    if (index == arr.length) {
        cb([], true);
    } else {
        arr[index] = JSON.stringify(arr[index]);
        arr[index] = JSON.parse(arr[index]);
        if (arr[index]['brands'] && arr[index]['products'] && arr[index]['type'] == 'delivery') {
            if (item['url'].indexOf(arr[index]['brands']['url']) > -1) {
                Rate.find({
                    shippings: arr[index]['_id']
                }, function(err, List) {
                    if (err) {
                        index = index + 1;
                        getDeliveryCharges(index, arr, item, cb)
                    } else if (List.length == 0 && !List) {
                        index = index + 1;
                        getDeliveryCharges(index, arr, item, cb)
                    } else {
                        return cb(List);

                    }
                });
            } else {
                index = index + 1;
                getDeliveryCharges(index, arr, item, cb);
            }
        } else {
            index = index + 1;
            getDeliveryCharges(index, arr, item, cb);
        }

    }
}

function GenerateOrderId(cb) {
    OrderNumber.findOne({}, function(err, OrderN) {
        if (err) {
            cb('THO100001');
        } else if (!OrderN || OrderN == null || OrderN == '') {
            var obj = {
                last_number: 100002
            };
            OrderNumber(obj).save(function(err) {
                if (err) {
                    console.log(err)
                }
            });
            cb('THO100001');
        } else {
            OrderNumber.findByIdAndUpdate(OrderN._id, {
                $set: {
                    last_number: OrderN.last_number + 1,
                    updated_at: new Date()
                }
            }).exec(function(err) {
                if (err) {
                    console.log(err)
                }
            });
            cb('THO' + OrderN.last_number);
        }
    });
}

function getPromoIfAvailable(userId, cb) {
    UsedPromoCode.findOne({
            user: userId,
            is_used: false
        }).populate('user').populate({
            path: 'promo',
            model: 'Promo',
            match: {
                end_date: {
                    $gte: new Date()
                }
            }
        })
        .exec(function(err, promo) {
            if (err) {
                cb(err);
            } else if (!promo || promo == null || promo == '') {
                cb(true);
            } else {
                promo = JSON.stringify(promo);
                promo = JSON.parse(promo);
                cb(null, promo);
            }
        })
}


function groupBy(arr, property) {
    return arr.reduce(function(memo, x) {
        if (!memo[x[property]]) {
            memo[x[property]] = [];
        }
        memo[x[property]].push(x);
        return memo;
    }, {});
}

function checkUsUrl(arr, cb) {

    for (var i = 0; i < arr.length; i++) {
        if (arr[i]['url'].indexOf() == -1) {
            arr[i]['isInvalid'] = true;
            cb(arr);
            break;
        }
    }
    cb(false);
}

exports.orderAdding = function(req, res) {
    var order = req.body
    order.user = req.user;
    var itemsORderForProducts = groupBy(order.items, 'product_id');
    var keysProduct = Object.keys(itemsORderForProducts);

    getRates(0, keysProduct, itemsORderForProducts, function(allITems) {
        order.items = [];
        Object.keys(allITems).forEach(function(key) {
            for (var i = 0; i < allITems[key].length; i++) {
                order.items.push(allITems[key][i]);
            }
        });
        var shippingTotal = 0;
        var grandTotal = 0;
        var delCharges = 0;
        var brandShipping = 0;
        for (var j = 0; j < order.items.length; j++) {
            shippingTotal += Number(order.items[j]['shipping_charges']);
            delCharges += Number(order.items[j]['delivery_charges']);
            grandTotal += Number(order.items[j]['price']);
        }
        var itemsORderForBrands = groupBy(order.items, 'brand_id');

        var keysObj = Object.keys(itemsORderForBrands);
        getBrandShipping(0, keysObj, itemsORderForBrands, function(items) {
            if (items.brand_shipping) {
                order.brand_shipping = items.brand_shipping;
            } else {
                order.brand_shipping = 0;
            }
            order.items = [];
            Object.keys(items).forEach(function(key) {
                for (var i = 0; i < items[key].length; i++) {
                    order.items.push(items[key][i]);
                }
            });
            getPromoIfAvailable(req.user._id, function(e, promo) {
                if (e) {
                    // order.items = items;
                    order.order_status = "reviewing";
                    order.total_shipping = (shippingTotal);
                    if (order.brand_shipping) {
                        grandTotal += Number(order.brand_shipping);
                    }
                    order.total_amount = (grandTotal);
                    order.tax = Number(parseFloat(global.settings.tax_percentage * Number(grandTotal)).toFixed(2));
                    order.grand_total = (shippingTotal + grandTotal);
                    order.service_charges = global.settings.service_charges_percentage * (order.total_amount + order.total_shipping + order.brand_shipping + order.tax);
                    order.grand_total = (Number(order.grand_total) + Number(order.service_charges) + order.tax);
                    order.delivery_charges = delCharges;
                    order.price_pkr = (global.settings.us_doller * order.grand_total) + order.delivery_charges;
                    order.security_deposit = (global.settings.deposit_percentage * Number(order.price_pkr));
                    order.cod = Number(order.price_pkr) - Number(order.security_deposit);
                    GenerateOrderId(function(orderNumber) {
                        order.order_number = orderNumber;
                        Order(order).save(function(err) {
                            if (err) {
                                return res.status(400).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            } else {
                                res.jsonp(order);
                            }
                        });
                    });
                } else {
                    order.order_status = "reviewing";
                    order.total_shipping = (shippingTotal);
                    if (order.brand_shipping) {
                        grandTotal += Number(order.brand_shipping);
                    }
                    order.total_amount = (grandTotal);
                    order.tax = (global.settings.tax_percentage * Number(grandTotal));
                    order.grand_total = (shippingTotal + grandTotal);
                    order.service_charges = global.settings.service_charges_percentage * (order.total_amount + order.total_shipping + order.brand_shipping + order.tax);
                    order.grand_total = (Number(order.grand_total) + Number(order.service_charges) + order.tax);
                    order.delivery_charges = delCharges;
                    order.price_pkr = (global.settings.us_doller * order.grand_total) + order.delivery_charges;
                    if (promo.promo) {
                        var promos = promo.promo;
                        if (promos.type == 'free_delivery') {
                            order.discount = delCharges;
                            order.discountFor = "free_delivery";
                            order.discountMessage = "You got gree delivery for this order";
                            order.delivery_charges = 0;
                        }
                        if (promos.type == 'shipping_percentage') {
                            var discountPercentage = (promos.value / 100) * order.total_shipping;
                            order.total_shipping = (order.total_shipping - discountPercentage);
                            order.discount = promos.value;
                            order.discountFor = "shipping_percentage";
                            order.discountMessage = "You got " + promos.value + "% discount in shipping charges";
                        }
                        if (promos.type == 'free_shopping') {
                            order.price_pkr = Number(parseFloat(order.price_pkr - Number(promos.value)).toFixed(2));
                            order.discount = promos.value;
                            order.discountFor = "free_shopping";
                            order.discountMessage = "You got free shopping PKR" + promos.value + " discount for this order";
                        }
                        if (promos.type == 'deposit_voucher') {
                            if(Number(promos.value) > Number(order.price_pkr)){
                                order.price_pkr = 0.00;
                                order.discount = order.price_pkr;
                                order.discountFor = "deposit_voucher";
                                order.discountMessage = "You already paid PKR" + order.price_pkr + " amount";
                            
                            }else{
                                order.price_pkr = Number(parseFloat(order.price_pkr - Number(promos.value)).toFixed(2));
                                order.discount = promos.value;
                                order.discountFor = "deposit_voucher";
                                order.discountMessage = "You already paid PKR" + promos.value + " amount";   
                            }
                        }
                        UsedPromoCode.update({
                            user: req.user._id
                        }, {
                            $set: {
                                is_used: true
                            }
                        }, {
                            multi: true
                        }).exec(function(err, PromoCount) {

                        });
                    }
                    order.security_deposit = (global.settings.deposit_percentage * Number(order.price_pkr));
                    order.cod = Number(order.price_pkr) - Number(order.security_deposit);
                    GenerateOrderId(function(orderNumber) {
                        order.order_number = orderNumber;
                        order.save(function(err) {
                            if (err) {
                                return res.status(400).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            } else {
                                res.jsonp(order);
                            }
                        });
                    });
                }
            });
        });
    });

}


function ConvertObjToArr(myObj) {
    var array = $.map(myObj, function(value, index) {
        return [value];
    });
    console.log(array);
}

function getRates(index, arr, itemsORderForProducts, cb) {
    if (index == arr.length) {
        cb(itemsORderForProducts);
    } else {
        Rate.find({
            product_id: arr[index],
            quantity: itemsORderForProducts[arr[index]].length
        }, function(err, list) {
            if (err) {
                index = index + 1;
                getRates(index, arr, itemsORderForProducts, cb)
            } else if (!list || list.length == 0) {
                index = index + 1;
                getRates(index, arr, itemsORderForProducts, cb)
            } else {
                for (var i = 0; i < itemsORderForProducts[arr[index]].length; i++) {
                    itemsORderForProducts[arr[index]][i] = getType(itemsORderForProducts[arr[index]][i], 'shipping', list);
                    itemsORderForProducts[arr[index]][i] = getType(itemsORderForProducts[arr[index]][i], 'delivery', list);;
                }
                index = index + 1;
                getRates(index, arr, itemsORderForProducts, cb);
            }
        });
    }
}

function getType(obj, type, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]['type'] == type) {
            obj[type + '_charges'] = arr[i]['charges'];
        }
    }
    return obj;
}

function getBrandShipping(index, arr, items, cb) {
    if (index == arr.length) {
        cb(items);
    } else {
        var charges = 0;
        var brands = {};
        for (var i = 0; i < items[arr[index]].length; i++) {
            charges += Number(items[arr[index]][i]['price']);
            brands = items[arr[index]][i]['brands'];
        }
        console.log("Brand Minimum", JSON.stringify(brands));
        if (charges <= brands['minimum']) {
            items[arr[index]]['brand_shipping'] = brands['charges'];
            if (items['brand_shipping']) {
                items['brand_shipping'] = Number(items['brand_shipping']) + Number(brands['charges']);
            } else {
                items['brand_shipping'] = brands['charges']
            }

        }
        index = index + 1;
        getBrandShipping(index, arr, items, cb);
    }
}


function sendOrderStatusChangeEmail(email, order_number, order_status) {
    const nodemailer = require('nodemailer');
    var mailOptions = {
        to: email,
        from: 'twohonlineemail@gmail.com',
        subject: 'Two H Online Order ' + order_number + ' status changed',
        html: `<h1>Order Has been Changed</h1>`
    };

}


exports.orderChecking = function(req, res) {
    var order = req.body
    order.user = req.user;
    console.log(order);
    var itemsORderForProducts = groupBy(order.items, 'product_id');
    var keysProduct = Object.keys(itemsORderForProducts);

    getRates(0, keysProduct, itemsORderForProducts, function(allITems) {
        order.items = [];
        Object.keys(allITems).forEach(function(key) {
            for (var i = 0; i < allITems[key].length; i++) {
                order.items.push(allITems[key][i]);
            }
        });
        var shippingTotal = 0;
        var grandTotal = 0;
        var delCharges = 0;
        var brandShipping = 0;
        for (var j = 0; j < order.items.length; j++) {
            shippingTotal += Number(order.items[j]['shipping_charges']);
            delCharges += Number(order.items[j]['delivery_charges']);
            grandTotal += Number(order.items[j]['price']);
        }
        var itemsORderForBrands = groupBy(order.items, 'brand_id');

        var keysObj = Object.keys(itemsORderForBrands);
        getBrandShipping(0, keysObj, itemsORderForBrands, function(items) {
            if (items.brand_shipping) {
                order.brand_shipping = items.brand_shipping;
            } else {
                order.brand_shipping = 0;
            }
            order.items = [];
            Object.keys(items).forEach(function(key) {
                for (var i = 0; i < items[key].length; i++) {
                    order.items.push(items[key][i]);
                }
            });
            getPromoIfAvailable(req.user._id, function(e, promo) {
                if (e) {
                    // order.items = items;
                    order.order_status = "reviewing";
                    order.total_shipping = (shippingTotal);
                    order.total_amount = (grandTotal);
                    var special_offer = {
                        amount: ((((grandTotal * global.settings.special_offer_tax_percentage) + shippingTotal) * global.settings.us_doller) + Number(delCharges)),
                        message: ""
                    };
                    order.special_offer = special_offer;
                    order.tax = Number(parseFloat(global.settings.tax_percentage * Number(grandTotal)).toFixed(2));
                    order.grand_total = (shippingTotal + grandTotal);
                    order.service_charges = global.settings.service_charges_percentage * (order.total_amount + order.total_shipping + order.brand_shipping + order.tax);
                    order.grand_total = (Number(order.grand_total) + Number(order.service_charges) + order.tax);
                    order.delivery_charges = delCharges;
                    order.price_pkr = (global.settings.us_doller * order.grand_total) + order.delivery_charges;
                    order.security_deposit = (global.settings.deposit_percentage * Number(order.price_pkr));
                    order.cod = Number(order.price_pkr) - Number(order.security_deposit);
                    res.jsonp(order);
                } else {
                    order.order_status = "reviewing";
                    order.total_shipping = (shippingTotal);
                    if (order.brand_shipping) {
                        grandTotal += Number(order.brand_shipping);
                    }
                    order.total_amount = (grandTotal);
                    order.tax = (global.settings.tax_percentage * Number(grandTotal));
                    var special_offer = {
                        amount: ((((grandTotal * global.settings.special_offer_tax_percentage) + shippingTotal) * global.settings.us_doller) + Number(delCharges)),
                        message: ""
                    };
                    order.special_offer = special_offer;
                    order.grand_total = (shippingTotal + grandTotal);
                    order.service_charges = global.settings.service_charges_percentage * (order.total_amount + order.total_shipping + order.brand_shipping + order.tax);
                    order.grand_total = (Number(order.grand_total) + Number(order.service_charges) + order.tax);
                    order.delivery_charges = delCharges;
                    order.price_pkr = (global.settings.us_doller * order.grand_total) + order.delivery_charges;
                    if (promo.promo) {
                        var promos = promo.promo;
                        if (promos.type == 'free_delivery') {
                            order.discount = delCharges;
                            order.discountFor = "free_delivery";
                            order.discountMessage = "You got free delivery for this order";
                            order.delivery_charges = 0;
                        }
                        if (promos.type == 'shipping_percentage') {
                            var discountPercentage = (promos.value / 100) * order.total_shipping;
                            order.total_shipping = Number(parseFloat(order.total_shipping - discountPercentage).toFixed(2));
                            order.discount = promos.value;
                            order.discountFor = "shipping_percentage";
                            order.discountMessage = "You got " + promos.value + "% discount in shipping charges";
                        }
                        if (promos.type == 'free_shopping') {
                            order.price_pkr = Number(parseFloat(order.price_pkr - Number(promos.value)).toFixed(2));
                            order.discount = promos.value;
                            order.discountFor = "free_shopping";
                            order.discountMessage = "You got free shopping PKR" + promos.value + " discount for this order";
                        }
                        if (promos.type == 'deposit_voucher') {
                            if(Number(promos.value) > Number(order.price_pkr)){
                                order.price_pkr = 0.00;
                                order.discount = promos.value;
                                order.discountFor = "deposit_voucher";
                                order.discountMessage = "You already paid PKR" + order.price_pkr + " amount";
                            
                            }else{
                                order.price_pkr = Number(parseFloat(order.price_pkr - Number(promos.value)).toFixed(2));
                                order.discount = promos.value;
                                order.discountFor = "deposit_voucher";
                                order.discountMessage = "You already paid PKR" + promos.value + " amount";   
                            }
                        }
                    }
                    order.security_deposit = (global.settings.deposit_percentage * Number(order.price_pkr));
                    order.cod = Number(order.price_pkr) - Number(order.security_deposit);
                    res.jsonp(order);
                }
            });
        });
    })
}


exports.filter = function(req, res) {
    var query = req.query;
    var option = {
        page: 1,
        limit: 20
    }
    if (query.page) {
        option['page'] = query.page;
    }
    if (query.limit) {
        option['limit'] = query.limit;
    }
    if (query.type == 'date') {
        option['start'] = query.start;
        option['end'] = query.end;
    }
    if (query.type == 'gender') {
        query['gender'] = options.gender;
    }
    Filter.getDataFilter(Order, 'date', option, function(err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            return res.send(data);
        }
    });
}


exports.updateOrders = function(req,res){
    var id = req.params.id;
    var body = req.body;
    if(id){
        Order.findOne({_id:id}, function(err,order){
            if(err){
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }else if(!order || order == null){
                 return res.status(400).send({
                    message: "Invalid Order Id",
                    code:400,
                    success:false
                });
            }else{
                order = JSON.stringify(order);
                order = JSON.parse(order);
                order.price_pkr = Number(order.price_pkr);
                if(order.price_pkr == Number(body.security_deposit)){
                    Order.findByIdAndUpdate(id,{$set:{
                        security_deposit:body.security_deposit,
                        cod:0
                    }}, function(error,orderObj){
                        if(error){
                            return res.status(400).send({
                                 message: errorHandler.getErrorMessage(err)
                            });         
                        }else{
                            orderObj = JSON.stringify(orderObj);
                            orderObj = JSON.parse(orderObj);
                            return res.send({
                                code:200,
                                message:"security_deposit updated",
                                order: orderObj,
                                success:true
                            });                            
                        }
                    })
                }else if(Number(body.security_deposit) < order.price_pkr ){
                    var cod = (Number(order.price_pkr) - Number(body.security_deposit));
                    Order.findByIdAndUpdate(id,{$set:{
                        security_deposit:body.security_deposit,
                        cod:cod
                    }}, function(error,orderObj){
                        if(error){
                            return res.status(400).send({
                                 message: errorHandler.getErrorMessage(err)
                            });         
                        }else{
                            orderObj = JSON.stringify(orderObj);
                            orderObj = JSON.parse(orderObj);
                            return res.send({
                                code:200,
                                message:"security_deposit updated",
                                order: orderObj,
                                success:true
                            });                            
                        }
                    })
                }else if(Number(body.security_deposit) > order.price_pkr){
                      return res.status(400).json({
                                code:400,
                                message:"security_deposit cannot be update invalid amount",
                                success:false
                            }); 
                }
            }
        })
    }else{
         return res.status(400).send({
                message: 'Please Send order id'
            });
    }
};
