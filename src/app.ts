import { Request, Response } from "express";

const express = require("express");
const app = express();

app.use(express.json());

const lidarComRequisicao = async (req: Request, res: Response) => {
    return res.status(200).json({ok: true});
}

app.get("/teste", lidarComRequisicao);

export default app;