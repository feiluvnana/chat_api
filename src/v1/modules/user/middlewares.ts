import { Request, Response } from "express";
import { ErrorMessage, baseMessages } from "../../constants/messages.constant";
import { User, UserService } from "../../database/models/user.model";
import { io } from "../../..";

export async function getUserLogicMiddleware(req: Request, res: Response) {
    let user : User | null;
    try {
        if (!req.params.id || req.params.id === "") {
            user = await UserService.readByAccountId(res.locals.account.id);
        } else {
            user = await UserService.readById(req.params.id);
        }
    } catch {
        const message: ErrorMessage = {
            ...baseMessages.RESOURCE_LOOKUP_FAILED,
            error: {
                desc: "An error has occured when finding users."
            }
        }
        return res.status(500).json(message);
    }

    if (!user) return res.status(404).json(baseMessages.RESOURCE_NOT_FOUND);
    return res.status(200).json({
        ...baseMessages.OK,
        data: user
    });
}