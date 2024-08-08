const express = require('express');
const router = express.Router();
const model = require('../model');
const validator=require('../validation/supplier.validation')
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new Supplier.
router.post('/',validator.createSupplierValidation, async (req, res) => {
    try {
        const inData = await model.TBL_Supplier.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Supplier has been added.', supplierId: inData.supplierId });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get all Supplier details.
router.get('/', async (req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Supplier.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific Supplier details.
router.get('/:supplierId', async (req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Supplier.findOne({
            where: {
                supplierId: req.params.supplierId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific Supplier data.
router.put('/:supplierId', async (req, res) => {
    try {
        const Suppliers = await model.TBL_Supplier.update(req.body, {
            where: {
                supplierId: req.params.supplierId
            }
        });
        if (Suppliers[0] === 1) {
            res.json({ status: 200, response: "sucesss", message: "Supplier data updated successfully." })
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a Supplier.
router.delete('/:supplierId', async (req, res) => {
    try {
        const SupplierDlt = await model.TBL_Supplier.destroy({
            where: {
                supplierId: req.params.supplierId
            }
        });
        if (SupplierDlt === 1) {
            res.json({ status: 200, response: "success", message: "Supplier id has been deleted." })
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }

    } catch (error) {
        res.json(errResBody);
    }
});

module.exports = router;