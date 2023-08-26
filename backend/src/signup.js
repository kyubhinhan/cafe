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
    res.send("you get into signup router");
});
router.get("/check-duplicate/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, loginUtil_1.checkDuplicateEmail)(req.params.email);
    res.send(result);
}));
// 회원 가입
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        res.status(400).json({ message: "invalid request" });
        return;
    }
    const isDuplicated = yield (0, loginUtil_1.checkDuplicateEmail)(email);
    if (isDuplicated) {
        res.status(400).json({ message: "duplicated email" });
    }
    const type = (0, loginUtil_1.checkMasterEmail)(email) ? "manager" : "user";
    const newUser = yield prisma.user.create({
        data: {
            email,
            password,
            name,
            type,
        },
    });
    res.json(newUser);
}));
exports.default = router;
