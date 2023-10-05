import { Request, Response } from "express";
import { User } from "../entitiesOUmodels/user";
import { appDataSource } from "../database/data-source";


// CRUD (Create, Read, Update, Delete)

// Create
export const cadastrarUsuario = async (req: Request, res: Response) => {

    // if (!req.body.cpf) {
    //     return res.status(400).send({ok: false, message: "O cpf é obrigatório"});
    // }
    console.log(req.body, "Este é o corpo da requisição");

    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.cpf = req.body.cpf;
        // Salva no banco de dados o usuário
        await appDataSource.getRepository(User).save(user);

        return res.status(201).json({ ok: true, message: user });

    } catch (error) {
        console.log(error, "Erro ao cadastrar usuário");
        return res.status(400)
            .json({ ok: false, message: "Erro ao cadastrar usuário" })
    }
};

// Read
export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const users = await appDataSource.getRepository(User).find();
        return res.status(200).json({ ok: true, message: "Aqui está o banco", listaDeUsuários: users })
    } catch (error) {
        console.log(error, "Erro ao listar usuários")
        return res
            .status(500)
            .json({ ok: true, message: "Erro ao cadastrar usuário" });
    }
}

// Update
export const atualizarUsuario = async (req: Request, res: Response) => {
    const idUsuario = req.params.user_id;
    try {
        const user = await appDataSource.getRepository(User).findOne({
            where: { id: parseInt(idUsuario) }
        });

        if (!user) {
            return res.status(404).json({ ok: false, message: "Não existe um usuário com este ID" })
        }

        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        if (req.body.cpf) {
            user.cpf = req.body.cpf;
        }

        await appDataSource.getRepository(User).save(user);

        return res.status(201).json({ ok: true, message: "Usuário atualizado com sucesso" });

    } catch (error) {
        console.log(error, "Erro ao atualizar usuário")
        return res
            .status(500)
            .json({ ok: true, message: "Erro ao atualizar usuário" });
    }
}

// Delete
export const deletarUsuario = async (req: Request, res: Response) => {
    const id_usuario = req.params.user_id;

    try {
        const user = await appDataSource.getRepository(User).findOne({
            where: { id: parseInt(id_usuario) }
        })

        if (!user) {
            return res.status(404).json({ok: false, message: "Não existe usuário com esse ID"});
        }

        await appDataSource.getRepository(User).delete(user);

        return res.status(200).json({ok: true, message: "Usuário excluido com sucesso", usuárioExcluido: user});
    } catch (error) {
        console.log(error, "Erro ao deletar usuário");
        return res
        .status(500)
        .json({ok: false, message: "Erro ao deletar usuário"});
    }
}



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