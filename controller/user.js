const express = require('express');
const router = express.Router();
const model = require('../model');
const { where } = require('sequelize');
const bcrypt = require('bcrypt')
const token = require('../token')
// const uuid = require('uuid');
const validator = require('../validation/user.validation')

var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
const saltRounds = 10;
// Add a new user.
router.post('/', validator.createUserValidation, async (req, res) => {
    try {
        if (req.body.password != req.body.confirmPassword) {
            res.json({
                status: 301,
                response: 'validation error',
                msg: 'Confirm Password Mismatch.',
            });
            return false;
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        const userData = await model.TBL_User.findAll({
            where: {
                emailAddress: req.body.emailAddress,

            },
            // include: [{ all: true, nested: true }] 
        });
        if (userData && userData.length > 0) {
            res.json({
                status: 400,
                response: 'validationerror',
                msg: 'You already registered please signin.',
            });
        } else {
            const createUserResult = await model.TBL_User.create(req.body);
            res.json({
                status: 200,
                response: 'success',
                msg: 'Continue login process.',
                userId: createUserResult.userId,
            });

        }

    } catch (error) {
        res.json({ ...errResBody, error });
    }
});

// //user login.
router.post('/login', async (req, res) => {
    try {

        if (typeof req.body.emailAddress === 'undefined' || req.body.emailAddress == '' || req.body.emailAddress == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter userName.' });
            return false;
        }
        if (typeof req.body.password === 'undefined' || req.body.password == '' || req.body.password == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please send Password.' });
            return false;
        }
        const userData = await model.TBL_User.findOne({
            where: {
                emailAddress: req.body.emailAddress
            },
            include: [{ all: true, nested: true }]
        });
        if (userData) {
            bcrypt.compare(req.body.password, userData.password, (err, result) => {
                if (result) {
                    const authToken = token.assign({ emailAddress: req.body.emailAddress, UserId: userData.id });
                    res.json({ status: 200, response: 'success', data: userData, token: authToken });
                } else {
                    res.json({ status: 400, error: { code: 400, message: 'PASSWORD_NOT_MATCHED', errors: [{ message: "PASSWORD_NOT_MATCHED", domain: 'global', response: 'invalid' }] } });
                }
            })

        } else {
            res.json({ status: 400, error: { code: 400, message: 'EMAILADDRESS_NOT_FOUND', errors: [{ message: "EMAILADDRESS_NOT_FOUND", domain: 'global', response: 'invalid' }] } });
        }
    } catch (error) {
        console.log(error);
        res.json({ ...errResBody, error });
    }
});

// Get all user details.
router.get('/', async (req, res) => {
    try {
        const include = [{ all: true, nested: true }]
        const data = await model.TBL_User.findAll({
            include: include
            //         model: model.TBL_Role,
            //         as: 'user'
            //     }

            // ]

        });
        res.json({ status: 200, response: 'success', user: data || [] });
    } catch (error) {
        res.json(errResBody);
    }
});

// Get specific user details.
router.get('/:userId', async (req, res) => {
    try {
        const include = [{ all: true, nested: true }];
        const data = await model.TBL_User.findOne({
            where: {
                userId: req.params.userId
            },
            include: include
        });
        res.json({ status: 200, response: 'success', data: data || {} });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific user data.
router.put('/:userId', async (req, res) => {
    try {
        const Users = await model.TBL_User.update(req.body, {
            where: {
                userId: req.params.userId
            }
        });
        if (Users[0] === 1) {
            res.json({ status: 200, response: "sucesss", message: "user data updated successfully." })
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a user.
router.delete('/:userId', async (req, res) => {
    try {
        const UserDlt = await model.TBL_User.destroy({
            where: {
                userId: req.params.userId
            }
        });
        if (UserDlt === 1) {
            res.json({ status: 200, response: "success", message: "User id has been deleted." })
        } else {
            res.json({ status: 401, response: 'validationerror', msg: 'Invalid operation.' });
        }

    } catch (error) {
        res.json(errResBody);
    }
});

module.exports = router;