import {userSignupSchema, userSigninSchema, userRefreshTokenSchema} from "../schemas/user-schema.js";
import {validateBody} from "../decorators/index.js";

const signupUserValidate = validateBody(userSignupSchema);
const signinUserValidate = validateBody(userSigninSchema);
const userRefreshTokenValidate = validateBody(userRefreshTokenSchema);

export default {signupUserValidate, signinUserValidate, userRefreshTokenValidate}