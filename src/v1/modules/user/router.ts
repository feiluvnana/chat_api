import { Router } from "express";
import { userIdDtoMiddleware } from "./dto";
import { getUserLogicMiddleware } from "./middlewares";
import { extractAccount } from "../../constants/middlewares.auth";

const router = Router();

router.get("/", extractAccount(), userIdDtoMiddleware, getUserLogicMiddleware);
router.get("/:id", extractAccount(), userIdDtoMiddleware, getUserLogicMiddleware);

export const userRouter = router;