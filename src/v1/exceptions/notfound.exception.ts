import { Request, Response } from "express";
import { ResponseMessage, baseMessages } from "../constants/messages.constant";

export function notFoundExceptionMiddleware(_: Request, res: Response) {
    const message: ResponseMessage = baseMessages.RESOURCE_NOT_FOUND;

    res.status(404).json(message)
}