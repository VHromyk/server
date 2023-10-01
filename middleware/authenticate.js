import jwt from 'jsonwebtoken';
import {HttpError} from "../helpers/index.js";
import {ctrlWrapper} from "../decorators/index.js";
import User from "../models/User.js";

const {JWT_SECRET_ACCESS} = process.env;

const authenticate = async(req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, accessToken] = authorization.split(' ');

    if(bearer !== 'Bearer') {
        throw HttpError(401)
    }

    try {
        const {id} = jwt.verify(accessToken, JWT_SECRET_ACCESS);

        const user = await User.findById(id);

        if(!user || !user.accessToken) {
            throw HttpError(401)
        }

        // Check what user add the data
        req.user = user;
        next()

    } catch {
        throw HttpError(401)
    }
}

export default ctrlWrapper(authenticate);