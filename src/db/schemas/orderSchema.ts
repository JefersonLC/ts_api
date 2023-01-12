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
    .items({
      amount: amount.required(),
      product: product.required(),
    })
    .required()
    .min(1)
    .messages({
      'array.base': 'Must be a list',
      'object.unknown': 'Property not allowed',
      'object.base': 'The list must contaain a product',
      'any.required': 'Details is required',
    }),
}).messages({
  'object.unknown': 'Property not allowed',
});

export const getOrderSchema: Joi.ObjectSchema<any> = Joi.object({
  id,
});
