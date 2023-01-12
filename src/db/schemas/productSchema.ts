import Joi, { NumberSchema, StringSchema } from 'joi';

const id: StringSchema<string> = Joi.string().trim();
const name: StringSchema<string> = Joi.string().min(2).max(20).trim().messages({
  'string.base': 'Name must be text',
  'string.empty': 'Name must not be empty',
  'string.min': 'Name must have at least 2 characters',
  'string.max': 'Very long name',
  'any.required': 'Name is required',
});

const description: StringSchema<string> = Joi.string()
  .min(2)
  .max(200)
  .trim()
  .messages({
    'string.base': 'Description must be text',
    'string.empty': 'Description must not be empty',
    'string.min': 'Description must have at least 10 characters',
    'string.max': 'Very long description',
    'any.required': 'Description is required',
  });

const price: NumberSchema<number> = Joi.number().messages({
  'number.base': 'Price must be number',
  'any.required': 'Price is required',
});

const stock: NumberSchema<number> = Joi.number().integer().messages({
  'number.base': 'Stock must be number',
  'any.required': 'Stock is required',
  'number.integer': 'Stock must be an integer'
});

const photo: StringSchema<string> = Joi.string().max(150).trim().messages({
  'string.base': 'Photo must be text',
  'string.empty': 'Photo must not be empty',
  'string.max': 'Very long photo',
  'any.required': 'Photo is required',
});

const category: StringSchema<string> = Joi.string()
  .min(10)
  .max(10)
  .trim()
  .messages({
    'string.base': 'Category must be text',
    'string.empty': 'Category must not be empty',
    'string.min': 'Category must have at 10 characters',
    'string.max': 'Category must have at 10 characters',
    'any.required': 'Category is required',
  });

export const createProductSchema: Joi.ObjectSchema<any> = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  stock: stock.required(),
  photo: photo.required(),
  category: category.required(),
}).messages({
  'object.unknown': 'Property not allowed',
});

export const getProductSchema: Joi.ObjectSchema<any> = Joi.object({
  id,
});

export const updateProductSchema: Joi.ObjectSchema<any> = Joi.object({
  name,
  description,
  price,
  stock,
  photo,
  category,
}).messages({
  'object.unknown': 'Property not allowed',
});
