import express, { Express, Request, Response } from "express";
import { checkEmailExist, checkPasswordToEmail } from "@/loginUtil";

const router = express.Router();

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

  res.json({ message: "login ok" });
});

export default router;
