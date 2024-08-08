const express = require('express');
const router = express.Router();
const model = require('../model');
const validator=require('../validation/product.validation')
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new Product.
router.post('/',validator.createProductValidation, async (req, res) => {
    try {
        const inData = await model.TBL_Product.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Product has been added.', productId: inData.productId });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get all Product details.
router.get('/', async (req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Product.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific Product details.
router.get('/:productId', async (req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Product.findOne({
            where: {
                productId: req.params.productId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific Product data.
router.put('/:productId', async (req, res) => {
    try {
        const Products = await model.TBL_Product.update(req.body, {
            where: {
                productId: req.params.productId
            }
        });
        if (Products[0] === 1) {
            res.json({ status: 200, response: "sucesss", message: "Product data updated successfully." })
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a Product.
router.delete('/:productId', async (req, res) => {
    try {
        const PoductDlt = await model.TBL_Product.destroy({
            where: {
                productId: req.params.productId
            }
        });
        if (PoductDlt === 1) {
            res.json({ status: 200, response: "success", message: "Product id has been deleted." })
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }

    } catch (error) {
        res.json(errResBody);
    }
});

module.exports = router;