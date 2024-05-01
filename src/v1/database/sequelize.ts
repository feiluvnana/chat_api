import Sequelize, { importModels } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import { LoggerUtils } from "../utils/logger";
import { Account } from "./models/account.model";

const sequelize = new Sequelize({
    dialect: MySqlDialect,
    database: 'chat_api',
    user: 'root',
    password: '123456',
    host: 'localhost',
    port: 3306,
    models: [Account]
});

export async function initDatabase(): Promise<void> {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        LoggerUtils.i("Connected to MySQL.");
    } catch (err) {
        LoggerUtils.e({
            msg: "Error happened when initializing MySQL.",
            error: err
        });
    }
}