import {userSignupSchema, userSigninSchema, userRefreshTokenSchema, verifyUserSchema} from "../schemas/user-schema.js";
import {validateBody} from "../decorators/index.js";

const signupUserValidate = validateBody(userSignupSchema);
const signinUserValidate = validateBody(userSigninSchema);
const userRefreshTokenValidate = validateBody(userRefreshTokenSchema);
const verifyUser = validateBody(verifyUserSchema);

export default {signupUserValidate, signinUserValidate, userRefreshTokenValidate, verifyUser}