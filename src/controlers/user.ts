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
        user.cpf = req.body.cpf;
        // Salva no banco de dados o usuário
        await appDataSource.getRepository(User).save(user);

        return res.status(201).json({ok: true, message: user});

    } catch (error) {
        console.log(error, "Erro ao cadastrar usuário");
        return res.status(400)
        .json({ok: false, message: "Erro ao cadastrar usuário"})
    }

    return res.status(200).json({ok: true}); 
};


/*
interface Pessoa {
    nome: string;
    idade: number;
    nacionalidade: string;
    cpf: string;
}

const pessoa1: Pessoa = {
    nome: "Yan",
    idade: 20,
    cpf: "123.456.789-10",
    nacionalidade: ""
}

console.log(pessoa1);
*/