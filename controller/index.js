"use strict";

const user_controller = require("./user");
const role_controller = require("./role");
const product_controller = require("./product");
const productSupplierMap_controller = require("./productSupplierMap");
const supplier_controller = require("./supplier");
const order_controller = require("./order");
const shippingAddress_controller = require("./shippingAddress");



const token = require("../token");

const errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

require('dotenv').config();

const env = process.env.NODE_ENV || 'local'; //process env or DEVELOPMENT in default.
const config = require("../config/config.json")[env];
module.exports = function(app) {

    //middleware for checking the auth.
    function verifyToken(req, res, next) {
        // next();
        try {
            if (req.originalUrl === '/api/v1/api-docs' || req.originalUrl === '/api/v1/user/login' || req.originalUrl === '/api/v1/user') {
                next();
            } else {
                const bearerHeader = req.headers['authorization'];
                if (bearerHeader) {
                    const bearer = bearerHeader.split(' ');
                    const bearerToken = bearer[1];
                    const tokenIn = bearerToken;

                    const token_data = token.verify(tokenIn);

                    if (token_data) {
                        req.body.UserId = token_data.UserId;
                        next();
                    } else {
                        res.status(404).json({ status: 403, response: 'notauthorized', msg: 'Invalid Token.' });
                    }
                } else {
                    //Forbidden
                    res.status(403).json({ status: 403, response: 'notauthorized', msg: 'Not authorized.' });
                }
            }
        } catch (err) {
            res.json({...errResBody, err });
        }
    }

    //passing all the routes throught the auth checking middleware.
    //app.all('/*', verifyToken, function(req, res, next) {
        app.use('/api/v1/role', role_controller);
    app.all('/*', function(req, res, next) {
        next();
    })

    //rouing here.
    app.use('/api/v1/user', user_controller);
    // app.use('/api/v1/role', role_controller);
    app.use('/api/v1/product', product_controller);
    app.use('/api/v1/productSupplierMap', productSupplierMap_controller);
    app.use('/api/v1/supplier', supplier_controller);
     app.use('/api/v1/order', order_controller);
    app.use('/api/v1/shippingAddress', shippingAddress_controller);
  
};