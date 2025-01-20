import { Cliente } from "src/cliente/cliente.entity";
import { Produtos } from "src/produtos/produtos.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idCliente: number;

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

  @Column()
  idInstituicao: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedido)
  @JoinColumn({ name: "idCliente" })
  public cliente: Cliente;

  @ManyToOne(() => Produtos, (produto) => produto.pedido)
  @JoinColumn({ name: "idProduto" })
  public produto: Produtos;
}
