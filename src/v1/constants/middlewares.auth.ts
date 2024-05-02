import { NextFunction, Request, Response } from "express";
import { ErrorMessage, baseMessages } from "./messages.constant";
import { Account, AccountService } from "../database/models/account.model";
import { TokenUtils } from "../utils/token";

export function extractAccount() {
    return [
        extractToken(),
        async (req: Request, res: Response, next: NextFunction) => {
            let account: Account | null;
            try {
                account = await AccountService.readByUsername(res.locals.token.username);
                const message: ErrorMessage = {
                    ...baseMessages.RESOURCE_NOT_FOUND,
                    error: {
                        desc: "Account doesn't exist."
                    }
                }
                if (account == null) return res.status(401).json(message);
            } catch (err) {
                const message: ErrorMessage = {
                    ...baseMessages.RESOURCE_LOOKUP_FAILED,
                    error: {
                        desc: "An error has occured when checking token."
                    }
                }
                return res.status(500).json(message);
            }

            if (account.token == null) {
                const message: ErrorMessage = {
                    ...baseMessages.UNAUTHORIZED,
                    error: {
                        desc: "This account hasn't been logged in yet."
                    }
                }
                return res.status(401).json(message);
            }

            res.locals.account = account;
            return next();
        }
    ]
}

function extractToken() {
    return (req: Request, res: Response, next: NextFunction) => {
        const auths = req.headers.authorization?.split(" ");
        if (!auths || auths[0].toLowerCase() != "bearer") {
            return res.status(401).json(baseMessages.INVALID_TOKEN);
        }

        const token = auths[1];
        const tokenData = TokenUtils.verify(token);
        if (!tokenData) return res.status(401).json(baseMessages.INVALID_TOKEN);

        res.locals.token = tokenData;
        return next();
    }
}