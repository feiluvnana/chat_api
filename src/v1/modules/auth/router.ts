import { Router } from "express";
import { basicAuthDtoMiddleware } from "./dto";
import { loginLogicMiddleware, logoutLogicMiddleware, registerLogicMiddleware } from "./middlewares";
import { extractAccount } from "../../constants/middlewares.auth";

const router = Router();

router.post("/register", basicAuthDtoMiddleware, registerLogicMiddleware);
router.post("/login", basicAuthDtoMiddleware, loginLogicMiddleware);
router.post("/logout", extractAccount(), logoutLogicMiddleware);

export const authRouter = router;