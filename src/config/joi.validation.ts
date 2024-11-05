import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT_DEV: Joi.number().default(3000),
    DEFAULT_LIMIT: Joi.number().default(5),
});