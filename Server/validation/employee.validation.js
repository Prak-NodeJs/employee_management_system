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

const validateLeaveApplyRequest = {
    body: Joi.object().keys({
        start_date: Joi.string()
            .pattern(/^\d{4}-\d{2}-\d{2}$/)
            .required()
            .messages({
                'string.pattern.base': 'Joining date must be in the format YYYY-MM-DD',
                'any.required': 'Joining date is required'
            }),
        end_date: Joi.string()
            .pattern(/^\d{4}-\d{2}-\d{2}$/)
            .required()
            .messages({
                'string.pattern.base': 'Joining date must be in the format YYYY-MM-DD',
                'any.required': 'Joining date is required'
            }),
        leave_type:Joi.string().required()
    })
}


const validateUpdateLeaveRequest = {
    body:Joi.object().keys({
     status:Joi.string().valid('Accepted', 'Rejected').required(),
    })
}

const validateUpdateRmbrstRequest = {
    body:Joi.object().keys({
     status:Joi.string().valid('Accepted', 'Rejected').required(),
    })
}

const validateViewRmbrstRequest = {
    params:Joi.object().keys({
        id:Joi.number().required()
    })
}

const validateViewLeaveRequest= {
    params:Joi.object().keys({
        id:Joi.number().required()
    })
}

module.exports = {
    validateRegister,
    validateLeaveApplyRequest,
    validateUpdateLeaveRequest,
    validateUpdateRmbrstRequest,
    validateViewLeaveRequest,
    validateViewRmbrstRequest
}