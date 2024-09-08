const Joi = require('joi');

exports.addCustomerValidation = {
  body: Joi.object({
    first_name: Joi.string().min(2).max(30).required(),
    last_name: Joi.string().min(2).max(30).required(),
    city: Joi.string().required(),
    company: Joi.string().required(),
  })
}
