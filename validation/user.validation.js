const Joi = require("joi");

module.exports = {

    createUserValidation: (req, res, next) => {

        console.log(req.body)

        // create schema object
        const schema = Joi.object({
            firstName:Joi.string().required(),
            lastName:Joi.string().required(),
            emailAddress: Joi.string().required(),
            password: Joi.string().required().min(4),
            confirmPassword: Joi.string().required().min(4),
            roleId: Joi.number().integer().allow(null).allow('').optional(),
        });
        validateRequest(req, next, schema, res);
    }
}

// helper functions
function validateRequest(req, next, schema, res) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        res.json({ status: 400, response: 'validationerror', msg: 'Something went wrong.', data: `Validation error: ${error.details.map(x => x.message).join(', ')}` });
        // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        // next({ status: 401, response: 'validationerror', msg: error.details, data: error });
    } else {
       
        req.body = value;
        next();
    }
}