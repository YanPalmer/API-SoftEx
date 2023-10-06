import { atualizarUsuario, cadastrarUsuario, deletarUsuario, listarUsuarios } from "./controlers/user";
import ProductController from "./controlers/product";

import Express from "express";
// const express = require("express");
const app = Express();

app.use(Express.json());
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

// Rotas produto
app.post("/product", ProductController.createProduct);
app.get("/product", ProductController.listProducts);
app.patch("/product/:product_id", ProductController.atualizarProdutos);
app.delete("/product/:product_id", ProductController.deleteProduct);

export default app;