import Joi, { StringSchema } from 'joi';

const id: StringSchema<string> = Joi.string().trim();
const address: StringSchema<string> = Joi.string()
  .min(2)
  .max(50)
  .trim()
  .messages({
    'string.base': 'Address must be text',
    'string.empty': 'Address must not be empty',
    'string.min': 'Address must have at least 2 characters',
    'string.max': 'Very long Address',
    'any.required': 'Address is required',
  });

const user: StringSchema<string> = Joi.string().max(10).trim().messages({
  'string.base': 'User id must be text',
  'string.empty': 'User id must not be empty',
  'string.max': 'Very long user id',
  'any.required': 'User id is required',
});

export const createOrderSchema: Joi.ObjectSchema<any> = Joi.object({
  address: address.required(),
  user: user.required(),
}).messages({
  'object.unknown': 'Property not allowed',
});

export const getOrderSchema: Joi.ObjectSchema<any> = Joi.object({
  id,
});
