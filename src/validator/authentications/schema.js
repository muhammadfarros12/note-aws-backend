const Joi = require("joi");

// schema dan index dibuat setelah fungsi verifyUsersCredential didalam UserService
const PostAuthenticationPayloadSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});


const PutAuthenticationPayloadSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

const DeleteAuthenticationPayloadSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

module.exports = {
    PostAuthenticationPayloadSchema,
    PutAuthenticationPayloadSchema,
    DeleteAuthenticationPayloadSchema
};