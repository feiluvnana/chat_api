import { Request, Response } from "express";
import { ErrorMessage, SingleResourceMessage, baseMessages } from "../../constants/messages.constant";
import { Account, AccountService } from "../../database/models/account.model";
import { HashUtils } from "../../utils/hash";
import { TokenUtils } from "../../utils/token";

export async function registerLogicMiddleware(req: Request, res: Response) {
    let account: Account | null;
    try {
        account = await AccountService.readByUsername(req.body.username);
        const message: ErrorMessage = {
            ...baseMessages.RESOURCE_DUPLICATED,
            error: {
                desc: "This username is taken."
            }
        }
        if (account != null) return res.status(422).json(message);
    } catch (err) {
        const message: ErrorMessage = {
            ...baseMessages.RESOURCE_LOOKUP_FAILED,
            error: {
                desc: "An error has occured when checking account."
            }
        }
        return res.status(500).json(message);
    }

    try {
        await AccountService.create({
            username: req.body.username,
            password: HashUtils.hash(req.body.password)
        });
        return res.status(201).json(baseMessages.OK);
    } catch (err) {
        const message: ErrorMessage = {
            ...baseMessages.RESOURCE_CREATION_FAILED,
            error: {
                desc: "An error has occured when creating account."
            }
        }
        return res.status(500).json(message);
    }
}

export async function loginLogicMiddleware(req: Request, res: Response) {
    let account: Account | null;
    try {
        account = await AccountService.readByUsername(req.body.username);
        const message: ErrorMessage = {
            ...baseMessages.UNAUTHORIZED,
            error: {
                desc: "Username or password isn't correct."
            }
        }
        if (account == null) return res.status(401).json(message);
    } catch (err) {
        const message: ErrorMessage = {
            ...baseMessages.RESOURCE_LOOKUP_FAILED,
            error: {
                desc: "An error has occured when checking account."
            }
        }
        return res.status(500).json(message);
    }

    try {
        if (HashUtils.compare(req.body.password,account.password)) {
            const token = TokenUtils.create({
                username: req.body.username
            });
            await AccountService.updateToken(account, token);
            const message: SingleResourceMessage = {
                ...baseMessages.OK,
                data: { token }
            };
            return res.status(200).json(message);
        }
    } catch (err) {
        const message: ErrorMessage = {
            ...baseMessages.RESOURCE_CREATION_FAILED,
            error: {
                desc: "An error has occured when logging in."
            }
        }
        return res.status(500).json(message);
    }
}

export async function logoutLogicMiddleware(req: Request, res: Response) {
    const account = res.locals.account;

    try {
        await AccountService.updateToken(account, null);
        return res.status(200).json(baseMessages.OK);
    } catch (err) {
        const message: ErrorMessage = {
            ...baseMessages.RESOURCE_DELETION_FAILED,
            error: {
                desc: "An error has occured when logging out."
            }
        }
        return res.status(500).json(message);
    }
}