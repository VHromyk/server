import {HttpError} from "../helpers/index.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {ctrlWrapper} from "../decorators/index.js";

const {JWT_SECRET_ACCESS, JWT_SECRET_REFRESH} = process.env;

function createTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_SECRET_ACCESS, {expiresIn: '5d'});
    const refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH, {expiresIn: '30d'});

    return {accessToken, refreshToken};
}

const signup = async(req, res) => {
    const { email, password } = req.body;

    const isUser = await User.findOne({email});

    if(isUser) {
        throw HttpError(409, 'Email already exist')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashedPassword});

    res.status(201).json({username: newUser.username, email: newUser.email})
}

const signin = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        throw HttpError(401, 'Email or password invalid')
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword) {
        throw HttpError(401, 'Email or password invalid')
    }

    // JWT web token create

    const {_id: id} = user;

    const payload = {id};

    const {accessToken, refreshToken} = createTokens(payload);

    await User.findByIdAndUpdate(id, {accessToken, refreshToken})

    res.status(200).json({accessToken, refreshToken})

}

const getCurrent = async(req, res) => {
   const {username, email} = req.user;

   res.json({
       username,
       email
   })
}

const signout = async(req, res) => {
    const {_id} = req.user;

    await User.findByIdAndUpdate(_id, {accessToken: '', refreshToken: ''});

    res.status(200).json({message: 'Signout access'})

}

const refresh = async(req, res) => {
    const {refreshToken} = req.body;

    try {
        const {id} = jwt.verify(refreshToken, JWT_SECRET_REFRESH);
        const user = await User.findOne({refreshToken});

        const payload = {id};

        if(!user) {
            throw HttpError(403);
        }

        const {accessToken, refreshToken} = createTokens(payload);

        res.status(200).json({accessToken, refreshToken})

    } catch {
        throw HttpError(403);
    }
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    refresh: ctrlWrapper(refresh),
}