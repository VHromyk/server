import {Schema, model} from "mongoose";
import {handleSaveError, runValidateAndUpdate} from './hooks.js'

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegex,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    }
}, {versionKey: false, timestamps: true})

userSchema.pre('findOneAndUpdate', runValidateAndUpdate)

userSchema.post('save', handleSaveError);

userSchema.post('findOneAndUpdate', handleSaveError)


const User = model('user', userSchema);

export default User;