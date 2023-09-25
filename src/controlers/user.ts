import { Request, Response } from "express";




export const cadastrarUsuario = async (req: Request, res: Response) => {
    console.log(req.body, "Este é o corpo da requisição");
    return res.status(200).json({ok: true}); 
};