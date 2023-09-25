// import { Request, Response } from "express";

import { cadastrarUsuario } from "./controlers/user";

const express = require("express");
const app = express();

app.use(express.json());
/*
const lidarComRequisicao = async (req: Request, res: Response) => {
    return res.status(200).json({ok: true});
}

app.get("/teste", lidarComRequisicao);
*/

// Rotas
app.post("/users", cadastrarUsuario);
app.get("/users");
app.put("/users");
app.delete("/users");
export default app;