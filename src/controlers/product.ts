import { Request, Response } from "express";
import { Product } from "../entitiesOUmodels/product";
import { appDataSource } from "../database/data-source";

class ProductController {
    async createProduct(req: Request, res: Response) {
        const { title, price, color, size } = req.body; {
            console.log(req.body);
            /*
            DESESTRUTURAÇÃO typescript
            const title = req.body.title
            const price = req.body.price
            const color = req.body.color
            const size = req.body.size
            */

            if (!title) {
                res.status(500).json({message: "O campo title é obrigatório!"});
            }

            try {
                const product = await appDataSource.getRepository(Product).save({
                    title,
                    price,
                    color,
                    size
                })
                return res.status(200).json(product);
            } catch (error) {
                console.log(error, 'erro ao salvar produtos');
                return res.status(500).json(error);
            }
        }
    }

    async listProducts(req: Request, res: Response) {
        const products = appDataSource.getRepository(Product).find();
        if (products) {
            res.status(200).json({
                message: "Produtos encontrados",
                produtosEncontrados: products
            })
        }
    }
}

// Falta código

export default new ProductController();