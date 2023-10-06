import { Request, Response } from "express";
import { Product } from "../entitiesOUmodels/product";
import { appDataSource } from "../database/data-source";

// Cria produtos
class ProductController {
    async createProduct(req: Request, res: Response) {
        const { title, price, color, size } = req.body; {
            // console.log(title, price, color, size);
            /*
            DESESTRUTURAÇÃO typescript
            const title = req.body.title
            const price = req.body.price
            const color = req.body.color
            const size = req.body.size
            */

            if (!title) {
                res.status(500).json({ message: "O campo title é obrigatório!" });
            }
            if (!price) {
                res.status(500).json({ message: "O campo price é obrigatório!" });
            }
            if (!color) {
                res.status(500).json({ message: "O campo color é obrigatório!" });
            }
            if (!size) {
                res.status(500).json({ message: "O campo size é obrigatório!" });
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

    // Lista produtos
    async listProducts(req: Request, res: Response) {
        try {
            const products = await appDataSource.getRepository(Product).find();
            return res.status(200).json({
                message: "Produtos encontrados",
                produtosEncontrados: products
            })

        } catch (error) {
            console.error("Erro ao encontrar produtos: ", error)
            res.status(404).json({ message: "Produtos não encontrados" })
        }

    }

    // Deleta produtos
    async deleteProduct(req: Request, res: Response) {
        const productId = req.params.product_id;
        
        try {
            const produto = await appDataSource.getRepository(Product).findOne({
                where: {id: parseInt(productId)}
            })

            if (!produto) {
                return res.status(500).json({
                    message: "Produto não existe"
                })
            }
            await appDataSource.getRepository(Product).delete(produto);

            return res.status(200).json({
                message: "Produto excluído com sucesso",
                produto_Excluido: produto
            })
        } catch (error) {
            console.error("Erro ao excluir produto");
            res.status(500).json({
                message: "Erro ao excluir produto"
            })
        }

    }
}

// Falta código

export default new ProductController();