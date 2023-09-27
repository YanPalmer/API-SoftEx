// import { Request, Response } from "express";

import { atualizarUsuario, cadastrarUsuario, deletarUsuario, listarUsuarios } from "./controlers/user";

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
app.get("/users", listarUsuarios);
app.patch("/users/:user_id", atualizarUsuario);
app.delete("/users/:user_id", deletarUsuario);
export default app;