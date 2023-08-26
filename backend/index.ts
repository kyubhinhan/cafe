import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import loginRouter from "@/login";
import signupRouter from "@/signup";

const prisma = new PrismaClient();
const app: Express = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Node.js + express + prisma + supabase");
});

app.use(express.json());
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
