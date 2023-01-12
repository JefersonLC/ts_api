import Joi, { NumberSchema, StringSchema } from 'joi';

const id: StringSchema<string> = Joi.string().trim();
const address: StringSchema<string> = Joi.string()
  .min(2)
  .max(50)
  .trim()
  .messages({
    'string.base': 'Address must be text',
    'string.empty': 'Address must not be empty',
    'string.min': 'Address must have at least 2 characters',
    'string.max': 'Very long address',
    'any.required': 'Address is required',
  });

const amount: NumberSchema<number> = Joi.number().integer().messages({
  'any.required': 'Amount is required',
  'number.base': 'Amount must be number',
  'number.integer': 'Amount must be an integer',
});
const product: StringSchema<string> = Joi.string().trim().messages({
  'string.base': 'Product must be text',
  'any.required': 'Product is required',
  'string.empty': 'Product must not be empty',
});

export const createOrderSchema: Joi.ObjectSchema<any> = Joi.object({
  address: address.required(),
  details: Joi.array()
    .min(1)
    .items(
      Joi.object().keys({
        amount: amount.required(),
        product: product.required(),
      })
    )
    .messages({
      'array.base': 'Must be a list',
      'array.min': 'List must contain at least one product',
      'object.unknown': 'Property not allowed',
      'object.base': 'List must contain a product',
      'any.required': 'Details is required',
    })
    .required(),
}).messages({
  'object.unknown': 'Property not allowed',
});

export const getOrderSchema: Joi.ObjectSchema<any> = Joi.object({
  id,
});
