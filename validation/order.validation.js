const Joi = require("joi");

module.exports = {

    createOrderValidation: (req, res, next) => {

      

        // create schema object
        const schema = Joi.object({
            price: Joi.number().required(),
            productId: Joi.number().integer().required(),
            supplierId: Joi.number().integer().required(),
            userId: Joi.number().integer().required(),
            shippingAddressId: Joi.number().integer().required(),
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