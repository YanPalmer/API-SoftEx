import { Request, Response } from "express";
import { User } from "../entities/user";
import { appDataSource } from "../database/data-source";




export const cadastrarUsuario = async (req: Request, res: Response) => {

    if (!req.body.cpf) {
        return res.status(400).send({ok: false, message: "O cpf é obrigatório"});
    }
    console.log(req.body, "Este é o corpo da requisição");

    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        await appDataSource.getRepository(User).save(user);

        return res.status(201).json({ok: true});

    } catch (error) {
        console.log(error, "Erro ao cadastrar usuário");
        return res.status(400)
        .json({ok: false, message: "Erro ao cadastrar usuário"})
    }

    return res.status(200).json({ok: true}); 
};