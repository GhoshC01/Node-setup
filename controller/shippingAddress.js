const express = require('express');
const router = express.Router();
const model = require('../model');
const validator=require('../validation/shippingAddress.validation')
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new order.
router.post('/',validator.createShippingAddressValidation, async (req, res) => {
    try {
        const inData = await model.TBL_ShippingAddress.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'order has been added.', shippingAddressId: inData.shippingAddressId });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get all order details.
router.get('/', async (req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_ShippingAddress.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific order details.
router.get('/:shippingAddressId', async (req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_ShippingAddress.findOne({
            where: {
                shippingAddressId: req.params.shippingAddressId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific order data.
router.put('/:shippingAddressId', async (req, res) => {
    try {
        const oreders = await model.TBL_ShippingAddress.update(req.body, {
            where: {
                shippingAddressId: req.params.shippingAddressId
            }
        });
        if (oreders[0] === 1) {
            res.json({ status: 200, response: "sucesss", message: "order data updated successfully." })
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a order.
router.delete('/:shippingAddressId', async (req, res) => {
    try {
        const orderDlt = await model.TBL_ShippingAddress.destroy({
            where: {
                shippingAddressId: req.params.shippingAddressId
            }
        });
        if (orderDlt === 1) {
            res.json({ status: 200, response: "success", message: "order id has been deleted." })
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }

    } catch (error) {
        res.json(errResBody);
    }
});

module.exports = router;