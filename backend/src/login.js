"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const loginUtil_1 = require("@/loginUtil");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("you get into login haha");
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "empty email or password" });
        return;
    }
    const isExist = yield (0, loginUtil_1.checkEmailExist)(email);
    if (!isExist) {
        res.status(400).json({ message: "email not found" });
        return;
    }
    const isCorrectUser = yield (0, loginUtil_1.checkPasswordToEmail)(email, password);
    if (!isCorrectUser) {
        res.status(400).json({ message: "password not match" });
        return;
    }
    res.json({ message: "login ok" });
}));
exports.default = router;
