import Joi from "joi";
import {emailRegex} from "../models/User.js";

export const userSignupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().required().min(6)
})

export const userSigninSchema = Joi.object({
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().required().min(6)
})

export const userRefreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required()
})