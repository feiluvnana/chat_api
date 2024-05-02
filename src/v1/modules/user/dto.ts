import Joi from "joi";
import { checkPath } from "../../constants/middlewares.dto";

const userIdDto = Joi.object({
    id: Joi.string().allow("")
});

export const userIdDtoMiddleware = checkPath(userIdDto);