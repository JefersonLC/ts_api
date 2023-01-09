import Joi, { NumberSchema, StringSchema } from 'joi';

// const id: StringSchema<string> = Joi.string().trim();
const amount: NumberSchema<number> = Joi.number().integer();
const unitPrice: NumberSchema<number> = Joi.number();
const toltalPrice: NumberSchema<number> = Joi.number();
const order: StringSchema<string> = Joi.string().trim().min(10);
const product: StringSchema<string> = Joi.string().trim().min(10);

export const createDetailSchema: Joi.ArraySchema<any[]> = Joi.array().items({
  amount: amount.required(),
  unitPrice: unitPrice.required(),
  toltalPrice: toltalPrice.required(),
  order: order.required(),
  product: product.required(),
});

// export const getOrderSchema: Joi.ObjectSchema<any> = Joi.object({
//   id,
// });
