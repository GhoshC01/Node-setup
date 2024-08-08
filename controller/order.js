const express = require('express');
const router = express.Router();
const model = require('../model');
const validator=require('../validation/order.validation')
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new order.
router.post('/',validator.createOrderValidation, async (req, res) => {
    try {
        const inData = await model.TBL_Order.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'order has been added.', orderId: inData.orderId });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get all order details.
router.get('/', async (req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Order.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific order details.
router.get('/:orderId', async (req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Order.findOne({
            where: {
                orderId: req.params.orderId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific order data.
router.put('/:orderId', async (req, res) => {
    try {
        const oreders = await model.TBL_Order.update(req.body, {
            where: {
                orderId: req.params.orderId
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
router.delete('/:orderId', async (req, res) => {
    try {
        const orderDlt = await model.TBL_Order.destroy({
            where: {
                orderId: req.params.orderId
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