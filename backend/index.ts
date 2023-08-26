import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";

const prisma = new PrismaClient();
const app: Express = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Node.js + express + prisma + supabase");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
