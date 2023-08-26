"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./src/login"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = 5000;
app.get("/", (req, res) => {
    res.send("Typescript + Node.js + express + prisma + supabase");
});
app.use("/login", login_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
