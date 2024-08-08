const express = require('express');
const router = express.Router();
const model = require('../model');
const validator=require('../validation/role.validation');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// Add a new role.
router.post('/',validator.createRoleValidation, async (req, res) => {
    try {
        const inData = await model.TBL_Role.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Role has been added.', roleId: inData.roleId });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get all role details.
router.get('/', async (req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Role.findAll({
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific role details.
router.get('/:roleId', async (req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Role.findOne({
            where: {
                roleId: req.params.roleId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific role data.
router.put('/:roleId', async (req, res) => {
    try {
        const Roles = await model.TBL_Role.update(req.body, {
            where: {
                roleId: req.params.roleId
            }
        });
        if (Roles[0] === 1) {
            res.json({ status: 200, response: "sucesss", message: "role data updated successfully." })
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a user.
router.delete('/:roleId', async (req, res) => {
    try {
        const RoleDlt = await model.TBL_Role.destroy({
            where: {
                roleId: req.params.roleId
            }
        });
        if (RoleDlt === 1) {
            res.json({ status: 200, response: "success", message: "role id has been deleted." })
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }

    } catch (error) {
        res.json(errResBody);
    }
});

module.exports = router;