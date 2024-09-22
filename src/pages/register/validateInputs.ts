import * as Joi from 'joi'

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email should be a type of string',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is a required field',
    }),
}).unknown()

const registrationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a type of string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is a required field',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email should be a type of string',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is a required field',
    }),
}).unknown()

export const validateRegistrationData = <T>(data: T) => {
  return registrationSchema.validate(data)
}

export const validateLoginData = <T>(data: T) => {
  return loginSchema.validate(data)
}
