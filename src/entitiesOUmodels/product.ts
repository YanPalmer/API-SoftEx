// Importa os DECORATORS: Column, Entity e PrimaryGeneratedColumn da biblioteca "TYPEORM"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    price: number;
    
    // Atividade: Implementar um CRUD em "color" e "size"
    @Column()
    color: string;

    @Column()
    size: string

    // *Dica*: Não excluir produtos do banco de dados
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}