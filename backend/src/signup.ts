import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { checkEmailExist, checkMasterEmail } from "@/loginUtil";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("you get into signup router");
});

router.get("/duplicate", async (req, res) => {
  res.send(req.query.email);
  return;
  // const result = await checkEmailExist(req.params.email);
  // res.send(result);
});

// 회원 가입
router.post("/", async (req, res) => {
  const { email, password, name } = req.body;

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
      email,
      password,
      name,
      type,
    },
  });
  res.json(newUser);
});

export default router;
