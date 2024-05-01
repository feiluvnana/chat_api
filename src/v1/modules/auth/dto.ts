
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ErrorMessage, baseMessages } from "../../constants/messages.constant";
import { RegexUtils } from "../../utils/regex";

const basicAuthDto = Joi.object({
    username: Joi.string().regex(RegexUtils.username),
    password: Joi.string().regex(RegexUtils.password)
});

export function basicAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const vresult = basicAuthDto.validate(req.body);
    if (vresult.error !== undefined) {
        const message: ErrorMessage = {
            ...baseMessages.INVALID_PARAM,
            error: {
                desc: vresult.error.message
            }
        }
        return res.status(422).json(message);
    }

    return next();
};