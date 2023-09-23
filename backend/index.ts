import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import loginRouter from "@/login";
import signupRouter from "@/signup";
import menuRouter from "@/menu";

const app: Express = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Node.js + express + prisma + supabase");
});

app.use(express.json());
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/menu", menuRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
