import { Request, Response } from "express";
import { Product } from "../entitiesOUmodels/product";
import { appDataSource } from "../database/data-source";

// Cria produtos
class ProductController {
    async createProduct(req: Request, res: Response) {
        const { title, price, color, size } = req.body;
        // console.log(title, price, color, size);
        /*
        DESESTRUTURAÇÃO typescript
        const title = req.body.title
        const price = req.body.price
        const color = req.body.color
        const size = req.body.size
        */

        function verificarCampoObrigatorio(campo: any, nomeCampo: string,) {
            if (!campo) {
                res.status(500).json({message: `O campo ${nomeCampo} é obrigatório!`});
                return false;
            }
            return true;
        }

        // Verifica se cada campo está preenchido
        if (
            !verificarCampoObrigatorio(title, "title") ||
            !verificarCampoObrigatorio(price, "price") ||
            !verificarCampoObrigatorio(color, "color") ||
            !verificarCampoObrigatorio(size, "size")
        ) {
            return;
        }

        // Tenta salvar no banco
        try {
            const product = await appDataSource.getRepository(Product).save({
                title,
                price,
                color,
                size
            })
            return res.status(200).json({message: "Produto criado com sucesso!", produto: product});
        } catch (error) {
            console.log(error, 'erro ao salvar produtos');
            return res.status(500).json(error);
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

    // Atualizar produtos
    async atualizarProdutos(req: Request, res: Response) {
        const product_id = req.params.product_id;
        try {
            const produto = await appDataSource.getRepository(Product).findOne({
                where: { id: parseInt(product_id) }
            });
    
            if (!produto) {
                return res.status(404).json({ ok: false, message: "Não existe um produto com este ID" })
            }
    
            if (req.body.title) {
                produto.title = req.body.title;
            }
            if (req.body.price) {
                produto.price = req.body.price;
            }
            if (req.body.color) {
                produto.color = req.body.color;
            }
            if (req.body.name) {
                produto.size = req.body.size;
            }
    
            await appDataSource.getRepository(Product).save(produto);
    
            return res.status(201).json({ ok: true, message: "Produto atualizado com sucesso" });
    
        } catch (error) {
            console.log(error, "Erro ao atualizar produto")
            return res
                .status(500)
                .json({ ok: true, message: "Erro ao atualizar produto" });
        }
    }

    // Deleta produtos
    async deleteProduct(req: Request, res: Response) {
        const productId = req.params.product_id;

        try {
            const produto = await appDataSource.getRepository(Product).findOne({
                where: { id: parseInt(productId) }
            })

            if (!produto) {
                return res.status(404).json({
                    message: "Produto não encontrado"
                });
            }
            await appDataSource.getRepository(Product).delete(productId);
            // await appDataSource.getRepository(Product).delete(produto);

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