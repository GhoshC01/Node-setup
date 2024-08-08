const Joi = require("joi");

module.exports = {

    createProductValidation: (req, res, next) => {

      

        // create schema object
        const schema = Joi.object({
            name: Joi.string().required().min(2).max(255),
            description: Joi.string().required().max(500),
            category: Joi.string().required().max(255),
            manufacturer: Joi.string().required().max(255),
            price: Joi.number().required(),
            image: Joi.string().required().max(255),
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