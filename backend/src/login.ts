import express, { Express, Request, Response } from "express";
import { checkEmailExist, checkPasswordToEmail } from "@/loginUtil";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { auth, AuthedRequest } from "./authMiddleware";

dotenv.config();
const router = express.Router();

router.get("/test", auth, (req: AuthedRequest, res) => {
  const decoded = req.decoded;
  res.json({ decoded });
});

router.get("/", (req, res) => {
  res.send("you get into login haha");
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "empty email or password" });
    return;
  }

  const isExist = await checkEmailExist(email);
  if (!isExist) {
    res.status(400).json({ message: "email not found" });
    return;
  }

  const isCorrectUser = await checkPasswordToEmail(email, password);
  if (!isCorrectUser) {
    res.status(400).json({ message: "password not match" });
    return;
  }

  const key = String(process.env.SECRET_KEY);
  const token = jwt.sign({ type: "JWT", email }, key, { expiresIn: "3h" });
  res.json({
    token,
  });
});

export default router;
