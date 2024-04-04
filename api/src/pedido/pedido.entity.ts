import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idCliente: number;

  @Column()
  idProduto: number;
}