import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idCliente?: number;

  @Column()
  idProduto: number;

  @Column()
  pago: number;

  @Column()
  data: Date;

  @Column()
  nomeCliente?: string;

  @Column()
  quantidade?: number;

  @Column({ default: 0 })
  removido: number;
}