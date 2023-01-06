import Joi, { StringSchema, AnySchema } from 'joi';

const name: StringSchema<string> = Joi.string().min(2).trim().messages({
  'string.base': 'Name must be text',
  'string.empty': 'Name must not be empty',
  'string.min': 'Name must have at least 2 characters',
  'any.required': 'Name is required',
});
const lastname: StringSchema<string> = Joi.string().min(2).trim().messages({
  'string.base': 'Lastname must be text',
  'string.empty': 'Lastname must not be empty',
  'string.min': 'Lastname must have at least 2 characters',
  'any.required': 'Lastname is required',
});
const email: StringSchema<string> = Joi.string().email().trim().messages({
  'string.base': 'Email must be text',
  'string.empty': 'Email must not be empty',
  'string.email': 'Email is invalid',
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

export const createUser: Joi.ObjectSchema<any> = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  email: email.required(),
  password: password.required(),
  repeat_password: repeat_password.required(),
});
