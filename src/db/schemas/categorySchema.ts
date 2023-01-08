import Joi, { StringSchema } from 'joi';

const id: StringSchema<string> = Joi.string().trim();
const name: StringSchema<string> = Joi.string().min(2).max(20).trim().messages({
  'string.base': 'Name must be text',
  'string.empty': 'Name must not be empty',
  'string.min': 'Name must have at least 2 characters',
  'string.max': 'Very long name',
  'any.required': 'Name is required',
});

export const createCategorySchema: Joi.ObjectSchema<any> = Joi.object({
  name: name.required(),
}).messages({
  'object.unknown': 'Property not allowed',
});

export const getCategorySchema: Joi.ObjectSchema<any> = Joi.object({
  id,
});

export const updateCategorySchema: Joi.ObjectSchema<any> = Joi.object({
  name,
}).messages({
  'object.unknown': 'Property not allowed',
});