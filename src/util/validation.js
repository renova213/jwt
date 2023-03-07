import joi from 'joi';

const registerValidation=(data) => {
    const schema=joi.object({
        username: joi.string().required().min(6).max(16),
        password: joi.string().required().min(6).max(13),
        confirmationPassword: joi.string().required(),
        role: joi.string().required()
    });

    return schema.validate(data);
}

const loginValidation=(data) => {
    const schema=joi.object({
        username: joi.string().required(),
        password: joi.string().required()
    });

    return schema.validate(data);
}

export default { registerValidation, loginValidation };