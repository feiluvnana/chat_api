import { Router } from "express";
import { authRouter } from "./modules/auth/router";
import { userRouter } from "./modules/user/router";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export const v1 = router;