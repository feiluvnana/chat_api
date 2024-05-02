import Joi from "joi";
import { RegexUtils } from "../../utils/regex";
import { checkBody } from "../../constants/middlewares.dto";

const basicAuthDto = Joi.object({
    username: Joi.string().regex(RegexUtils.username),
    password: Joi.string().regex(RegexUtils.password)
});

export const basicAuthDtoMiddleware = checkBody(basicAuthDto);