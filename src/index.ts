import express from "express";
import { initDatabase } from "./v1/database/sequelize";
import { notFoundExceptionMiddleware } from "./v1/exceptions/notfound.exception";
import { LoggerUtils } from "./v1/utils/logger";
import { v1 } from "./v1/v1";

const app = express();
async function start(): Promise<void> {
	await initDatabase();

	app.use(express.json());

	app.use("/v1", v1);

	app.use(notFoundExceptionMiddleware);

	app.listen("3000", () => {
		LoggerUtils.i("Server is running on port 3000");
	});
}

start();