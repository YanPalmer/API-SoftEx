import { DataSource } from "typeorm";
import { User } from "../entities/user";

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    // Porta atual do postgres
    port: 5432,
    username: "postgres",
    password: "root",
    database: "api-softex",
    // Seleciona a entidade especificada
    entities: [User],
    // Sincroniza com o banco de dados
    synchronize: true
    // Ou
    // entities: ["src/entities/*.ts"]
})

// export const startDatabase = async () => {
//     try {
//         await appDataSource.initialize();
//     }
//     catch (err) {
//         console.log(err, "Erro ao conectar ao banco de dados");
//         // Trata o erro
//         console.log("Corrigindo código");
//         // Lança o erro para o próximo catch
//         throw err;
//     }
// }