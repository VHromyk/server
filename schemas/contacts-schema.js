import Joi from "joi";

export const contactsAddSchema = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    favorite: Joi.boolean()
})

export const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})
