import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { checkEmailExist, checkMasterEmail } from "@/loginUtil";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("you get into signup router");
});

router.get("/duplicate", async (req, res) => {
  const result = await checkEmailExist(String(req.query.email));
  console.log("enter duplicate");
  res.json({ isDuplicate: result });
});

// 회원 가입
router.post("/", async (req, res) => {
  const { uid, email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: "invalid request" });
    return;
  }

  const isExist = await checkEmailExist(email);
  if (isExist) {
    res.status(400).json({ message: "duplicated email" });
  }

  const type = checkMasterEmail(email) ? "manager" : "user";
  const newUser = await prisma.user.create({
    data: {
      id: uid,
      email,
      password,
      name,
      type,
    },
  });
  res.json(newUser);
});

export default router;
