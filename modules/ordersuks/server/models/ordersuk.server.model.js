'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Order Schema
 */
var Ordersuk = new Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    },
    total_amount: String,
    total_shipping: String,
    tax: String,
    service_charges: String,
    price_pkr: String,
    discount: String,
    delivery_charges: String,
    grand_total: String,
    discountFor: String,
    discountMessage: String,
    order_number: String,
    brand_shipping: String,
    security_deposit: String,
    contact_me_if_no_items: { type: Boolean, default: false },
    purchase_whatever_available: { type: Boolean, default: false },
    cod: String,
    address: String,
    user_id: { type: Schema.ObjectId, ref: 'User' },
    user_name: String,
    items: [{ url: String, price: String, quantity: String, shipping_charges: String, delivery_charges: String, additional_info: String }],
    type: String,
    order_status: { type: String, enum: ['processing', 'order_placed', 'order_received', 'dispatched','reviewing'] }
});

mongoose.model('Ordersuk', Ordersuk);