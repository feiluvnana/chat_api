import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { initDatabase } from "./v1/database/sequelize";
import { notFoundExceptionMiddleware } from "./v1/exceptions/notfound.exception";
import { LoggerUtils } from "./v1/utils/logger";
import { v1 } from "./v1/v1";

const app = express();
const httpServer = createServer(app);
export const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer)

async function start(): Promise<void> {
    await initDatabase();

    app.use(express.json());
    app.use(LoggerUtils.express());
    app.use("/v1", v1);
    app.use(notFoundExceptionMiddleware);

    io.on("connection", socket => {
        socket.on("sendText", text => {
            socket.emit("basic", "This is nothing.");
        });
    });

    httpServer.listen("3000", () => {
        LoggerUtils.i("Server is running on port 3000");
    });
}

start();

interface ServerToClientEvents {
    basic: (text: string) => void;
}

interface ClientToServerEvents {
    sendText: (text: string) => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}