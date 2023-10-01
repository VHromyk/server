import express from 'express'

import validate from '../../middleware/userValidation.js';
import authController from '../../controllers/auth-controller.js'
import {authenticate} from "../../middleware/index.js";

const authRouter = express.Router();

authRouter.post('/signup', validate.signupUserValidate, authController.signup)

authRouter.post('/signin', validate.signinUserValidate, authController.signin)

authRouter.get('/current', authenticate, authController.getCurrent)

authRouter.post('/signout', authenticate, authController.signout)

authRouter.post('/refresh', validate.userRefreshTokenValidate, authController.refresh)

export default authRouter;