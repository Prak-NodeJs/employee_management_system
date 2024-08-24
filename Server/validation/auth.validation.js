const Joi = require('joi')


const validateRegister = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(20),
    role: Joi.string().valid('HR', 'Employee').required(), 
    address: Joi.string().required(),
    grade: Joi.string().required(),
    job_location: Joi.string().required(),
    reporting_manager: Joi.string().required(),
    joining_date: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/) 
      .required()
      .messages({
        'string.pattern.base': 'Joining date must be in the format YYYY-MM-DD',
        'any.required': 'Joining date is required'
      })
  })
};

const validateLogin = {
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required()
    })
};

module.exports = {
  validateLogin, validateRegister
}