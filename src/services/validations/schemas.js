const Joi = require('joi');

const displayNameSchema = Joi.string().min(8);

const passwordSchema = Joi.string().min(6);

module.exports = {
  displayNameSchema,
  passwordSchema,
};