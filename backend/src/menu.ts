import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// 메뉴 모두 조회하는 api
router.get("/", (req, res) => {
  res.send("you get into menu router");
});

// 메뉴 등록 api
router.post("/", async (req, res) => {});

export default router;
