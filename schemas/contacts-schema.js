import Joi from "joi";

const contactsAddSchema = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required()
})

export default contactsAddSchema;