const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
  });
  const valid = schema.validate(data);
  return valid;
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const valid = schema.validate(data);
  return valid;
};

module.exports = {
  registerValidation,
  loginValidation,
};
