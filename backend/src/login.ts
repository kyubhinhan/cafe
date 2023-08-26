import express, { Express, Request, Response } from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("you get into login router");
});

export default router;
