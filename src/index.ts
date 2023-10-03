import "reflect-metadata";
import { appDataSource } from "./database/data-source";
import app from "./app";

console.log("Aplicativo iniciando...");
setTimeout(() => {
    main();
}, 2000);

const main = async () => {
    try {
        // Conectando banco de dados
        await appDataSource.initialize();
        console.log("Banco de dados conectado com sucesso");

        // Iniciando express
        app.listen(3000, () => {
            console.log("Aplicação ouvindo requisições na porta 3000")
        })
    } catch (error) {
        console.log(error);
        console.log("Erro na ao iniciar banco")
    }

}