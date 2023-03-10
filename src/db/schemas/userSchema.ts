import Joi, { StringSchema, AnySchema } from 'joi';

const id: StringSchema<string> = Joi.string().trim();
const name: StringSchema<string> = Joi.string().min(2).max(20).trim().messages({
  'string.base': 'Name must be text',
  'string.empty': 'Name must not be empty',
  'string.min': 'Name must have at least 2 characters',
  'string.max': 'Very long name',
  'any.required': 'Name is required',
});
const lastname: StringSchema<string> = Joi.string()
  .min(2)
  .max(20)
  .trim()
  .messages({
    'string.base': 'Lastname must be text',
    'string.empty': 'Lastname must not be empty',
    'string.min': 'Lastname must have at least 2 characters',
    'string.max': 'Very long lastname',
    'any.required': 'Lastname is required',
  });
const email: StringSchema<string> = Joi.string()
  .email()
  .max(50)
  .trim()
  .messages({
    'string.base': 'Email must be text',
    'string.empty': 'Email must not be empty',
    'string.email': 'Email is invalid',
    'string.max': 'Very long email',
    'any.required': 'Email is required',
  });
const password: StringSchema<string> = Joi.string().min(8).trim().messages({
  'string.base': 'Password must be text',
  'string.empty': 'Password must not be empty',
  'string.min': 'Password must have at least 8 characters',
  'any.required': 'Password is required',
});
const repeat_password: AnySchema<any> = Joi.equal(Joi.ref('password')).messages(
  {
    'any.only': 'Passwords do not match',
    'any.required': 'Password is required',
  }
);
const role: StringSchema<string> = Joi.string()
  .trim()
  .equal('admin', 'common')
  .messages({
    'any.only': "Role must be 'admin' or 'common'",
  });

export const createUserSchema: Joi.ObjectSchema<any> = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  email: email.required(),
  password: password.required(),
  repeat_password: repeat_password.required(),
}).messages({
  'object.unknown': 'Property not allowed',
  'object.base': 'Must be of user object'
});

export const getUserSchema: Joi.ObjectSchema<any> = Joi.object({
  id,
});

export const getUserByRoleSchema: Joi.ObjectSchema<any> = Joi.object({
  role,
});

export const updateUserSchema: Joi.ObjectSchema<any> = Joi.object({
  name,
  lastname,
})
  .min(1)
  .messages({
    'object.unknown': 'Property not allowed',
    'object.min': 'There must be at least one value to change',
  });

export const logInUserSchema: Joi.ObjectSchema<any> = Joi.object({
  email: email.required(),
  password: password.required(),
}).messages({
  'object.unknown': 'Property not allowed',
  'object.base': 'Must be of user object'
});
