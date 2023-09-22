import "reflect-metadata";
import { appDataSource } from "./database/data-source";

console.log("Hello world");

const main = async () => {
    try {
        await appDataSource.initialize();
        console.log("Banco de dados conectado com sucesso");
    } catch (error) {
        console.log(error);
        console.log("Erro na area2")
    }

}

main();