import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { checkDuplicateEmail, checkMasterEmail } from "@/loginUtil";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("you get into signup router");
});

router.get("/check-duplicate/:email", async (req, res) => {
  const result = await checkDuplicateEmail(req.params.email);
  res.send(result);
});

// 회원 가입
router.post("/", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: "invalid request" });
    return;
  }

  const isDuplicated = await checkDuplicateEmail(email);
  if (isDuplicated) {
    res.status(400).json({ message: "duplicated email" });
  }

  const type = checkMasterEmail(email) ? "manager" : "user";
  const newUser = await prisma.user.create({
    data: {
      email,
      password,
      name,
      type,
    },
  });
  res.json(newUser);
});

export default router;
