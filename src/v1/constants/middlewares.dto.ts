import Joi from "joi";
import { ErrorMessage, baseMessages } from "./messages.constant";
import { Request, Response, NextFunction } from "express";
import { TokenUtils } from "../utils/token";

export function checkBody(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const vresult = schema.validate(req.body);
        if (vresult.error !== undefined) {
            const message: ErrorMessage = {
                ...baseMessages.INVALID_PARAMS,
                error: {
                    desc: vresult.error.message
                }
            }
            return res.status(422).json(message);
        }

        req.body = {
            ...req.body,
            ...vresult.value
        }
        return next();
    }
}

export function checkPath(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const vresult = schema.validate(req.params);
        if (vresult.error !== undefined) {
            const message: ErrorMessage = {
                ...baseMessages.INVALID_PARAMS,
                error: {
                    desc: vresult.error.message
                }
            }
            return res.status(422).json(message);
        }

        req.params = {
            ...req.params,
            ...vresult.value
        }
        return next();
    }
}