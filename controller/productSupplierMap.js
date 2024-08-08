const express = require('express');
const router = express.Router();
const model = require('../model'); 
const validator=require('../validation/productSupplierMap.validation')
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new Product map supplier.
router.post('/',validator.createproductSupplierMapValidation, async (req, res) => {
    try {
        const inData = await model.TBL_ProductSupplierMap.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Product map supplier has been added.', mapId: inData.mapId });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get all Product map supplier details.
router.get('/', async (req, res) => {
    try {
        const include =  [{ all: true, nested: true }] ;
        const data = await model.TBL_ProductSupplierMap.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific Product map supplier details.
router.get('/:mapId', async (req, res) => {
    try {
        const include = [{ all: true, nested: true }] ;
        const data = await model.TBL_ProductSupplierMap.findOne({
            where: {
                mapId: req.params.mapId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific Product map supplier data.
router.put('/:mapId', async (req, res) => {
    try {
        const ProductSupplierMaps = await model.TBL_ProductSupplierMap.update(req.body, {
            where: {
                mapId: req.params.mapId
            }
        });
        if (ProductSupplierMaps[0] === 1) {
            res.json({ status: 200, response: "sucesss", message: "Product map supplier data updated successfully." })
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a Product map supplier.
router.delete('/:mapId', async (req, res) => {
    try {
        const ProductSupplierMapDlt = await model.TBL_ProductSupplierMap.destroy({
            where: {
                mapId: req.params.mapId
            }
        });
        if (ProductSupplierMapDlt === 1) {
            res.json({ status: 200, response: "success", message: "Product map supplier id has been deleted." })
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }

    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;