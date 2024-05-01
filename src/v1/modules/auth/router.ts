import { Router } from "express";
import { basicAuthMiddleware } from "./dto";
import { loginLogicMiddleware, registerLogicMiddleware } from "./middlewares";

const router = Router();

router.post("/register", basicAuthMiddleware, registerLogicMiddleware);
router.post("/login", basicAuthMiddleware, loginLogicMiddleware);
router.post("/logout");

export const authRouter = router;