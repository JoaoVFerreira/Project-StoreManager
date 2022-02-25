const Joi = require('joi');

const schemaSale = Joi.object({
  productId: Joi.number().required().messages({
    'number.required': '"productId" is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'number.required': '"quantity" is required"',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
});

module.exports = {
  schemaSale,
};